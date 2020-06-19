"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const async_1 = require("async");
const stanza_1 = require("stanza");
const Actions = tslib_1.__importStar(require("../actions"));
const Constants_1 = require("../Constants");
const Selectors = tslib_1.__importStar(require("../Selectors"));
class Mesh {
    constructor(client) {
        this.jingle = client.jingle;
        this.dispatch = client.dispatch;
        this.getState = client.getState;
        this.sfu = client.sfu;
        this.updateQueue = async_1.priorityQueue(async (time, done) => {
            const state = this.getState();
            const audioPeersCount = Selectors.countPeersWantingAudio(state);
            const videoPeersCount = Selectors.countPeersWantingVideo(state);
            const calls = Selectors.getJoinedCalls(state);
            const media = Selectors.getMedia(state);
            const sharedMedia = Selectors.getSharedMedia(state);
            const sharedVideoCount = sharedMedia.filter(m => m.kind === 'video').length;
            const totalVideosCount = sharedVideoCount * videoPeersCount;
            this.sfu.setPeerCount(Math.max(audioPeersCount, videoPeersCount));
            try {
                if (this.sfu.enabled) {
                    await this.sfu.ready;
                }
                await Promise.all(sharedMedia.map(track => this.sfu.sendMedia(track.track, track.stream, track.screenCapture)));
            }
            catch (err) {
                if (done) {
                    done();
                }
                return;
            }
            const activeCalls = new Set();
            for (const call of calls) {
                if (call.joined) {
                    activeCalls.add(call.roomAddress);
                }
            }
            const videoResolutionTiers = Selectors.getVideoResolutionTiers(state);
            let appliedTier = videoResolutionTiers[0];
            if (!this.sfu.enabled) {
                for (let i = 0; i < videoResolutionTiers.length; i++) {
                    const tier = videoResolutionTiers[i];
                    const nextTier = videoResolutionTiers[i + 1];
                    if (tier[0] === totalVideosCount || !nextTier) {
                        appliedTier = tier;
                        break;
                    }
                    if (nextTier[0] > totalVideosCount) {
                        appliedTier = tier;
                        break;
                    }
                }
            }
            if (appliedTier) {
                const { width, height, frameRate } = appliedTier[1];
                this.dispatch(Actions.adjustVideoCaptureResolution(width, height, frameRate));
            }
            // The total bandwidth we want to send depends on the number of outgoing
            // video tracks. It is specified in kilobits per second.
            const totalMaxBitrate = 1800000;
            const sessionMaxBitrate = totalMaxBitrate / ((this.sfu.enabled ? 1 : videoPeersCount) * sharedVideoCount);
            // Dispose of any orphaned connections after leaving a call
            const allConnections = Selectors.getConnections(state);
            for (const connId of Object.keys(allConnections)) {
                const conn = allConnections[connId];
                const sess = this.jingle.sessions[conn.id];
                if (sess && !activeCalls.has(conn.roomAddress)) {
                    sess.end();
                }
            }
            for (const call of calls) {
                const peers = Selectors.getPeersForCall(state, call.roomAddress);
                for (const peer of peers) {
                    const needsVideo = new Set();
                    const needsAudio = new Set();
                    const wantsVideo = peer.requestingMedia === 'video';
                    const wantsAudio = peer.requestingMedia === 'video' || peer.requestingMedia === 'audio';
                    const peerSharedMedia = new Map();
                    const overSharedSessions = new Set();
                    const connections = Selectors.getConnectionsForPeer(state, peer.address);
                    for (const conn of connections) {
                        if (conn.sendingAudioMediaId) {
                            peerSharedMedia.set(conn.sendingAudioMediaId, 'audio');
                            if (!wantsAudio ||
                                !media[conn.sendingAudioMediaId] ||
                                !media[conn.sendingAudioMediaId].shared) {
                                overSharedSessions.add(conn.id);
                                if (conn.sendingVideoMediaId && wantsVideo) {
                                    needsVideo.add(conn.sendingVideoMediaId);
                                }
                            }
                        }
                        if (conn.sendingVideoMediaId) {
                            const sess = this.jingle.sessions[conn.id];
                            if (sess) {
                                sess.setMaximumBitrate(sessionMaxBitrate);
                            }
                            peerSharedMedia.set(conn.sendingVideoMediaId, 'video');
                            const video = media[conn.sendingVideoMediaId];
                            if ((!wantsVideo && !video.screenCapture) || !video || !video.shared) {
                                overSharedSessions.add(conn.id);
                                if (conn.sendingAudioMediaId && wantsAudio) {
                                    needsAudio.add(conn.sendingAudioMediaId);
                                }
                            }
                        }
                    }
                    for (const track of sharedMedia) {
                        if (!peerSharedMedia.has(track.id)) {
                            if (track.kind === 'audio' && wantsAudio) {
                                needsAudio.add(track.id);
                            }
                            if (track.kind === 'video' && wantsVideo) {
                                needsVideo.add(track.id);
                            }
                            if (track.kind === 'video' && track.screenCapture && wantsAudio) {
                                needsVideo.add(track.id);
                            }
                        }
                    }
                    for (const sessionId of overSharedSessions) {
                        const session = this.jingle.sessions[sessionId];
                        if (session) {
                            session.end();
                        }
                    }
                    const pairedTracks = new Map();
                    for (const id of [...needsAudio, ...needsVideo]) {
                        const track = media[id];
                        if (track) {
                            const pair = pairedTracks.get(track.stream.id) || {};
                            pair[track.kind] = track;
                            pairedTracks.set(track.stream.id, pair);
                        }
                    }
                    for (const pair of pairedTracks.values()) {
                        const session = this.jingle.createMediaSession(peer.address);
                        if (pair.audio) {
                            session.addTrack(pair.audio.track, pair.audio.stream);
                            this.dispatch(Actions.updateConnection(peer.address, session.sid, {
                                sendingAudioMediaId: pair.audio.id
                            }));
                        }
                        if (pair.video) {
                            session.addTrack(pair.video.track, pair.video.stream);
                            this.dispatch(Actions.updateConnection(peer.address, session.sid, {
                                sendingVideoMediaId: pair.video.id
                            }));
                        }
                        session.onDescriptionInfo = (changes, cb) => {
                            for (const content of changes.contents || []) {
                                const app = content.application;
                                if (!app) {
                                    continue;
                                }
                                const profile = app.simulcast && app.simulcast.profile;
                                if (profile) {
                                    this.sfu.setProfile(session.sid, app.simulcast.profile);
                                }
                            }
                            cb();
                        };
                        session.start({
                            offerToReceiveAudio: false,
                            offerToReceiveVideo: false
                        }, () => {
                            if (pair.video) {
                                session.setMaximumBitrate(sessionMaxBitrate);
                            }
                            if (pair.audio && pair.audio.localDisabled) {
                                session.mute(session.role, 'audio');
                            }
                            if (pair.video && pair.video.localDisabled) {
                                session.mute(session.role, 'video');
                            }
                            if (pair.video && pair.video.screenCapture) {
                                const creator = 'initiator';
                                session.send('description-info', {
                                    contents: [
                                        {
                                            application: {
                                                applicationType: stanza_1.Namespaces.NS_JINGLE_RTP_1,
                                                screenCaptures: [{ id: pair.video.id }]
                                            },
                                            creator,
                                            name: 'video'
                                        }
                                    ]
                                });
                            }
                        });
                    }
                }
            }
            if (done) {
                done();
            }
        }, 1);
        // We use multiple uni-directional media sessions, so don't
        // perform tie-breaking on session initiate requests
        this.jingle.performTieBreak = () => false;
        this.jingle.createPeerConnection = (session, opts) => {
            return this.sfu.createPeerConnection(session, opts);
        };
        this.updateICEServers();
    }
    updateICEServers() {
        this.jingle.resetICEServers();
        const config = Selectors.getAPIConfig(this.getState());
        for (const server of config.iceServers) {
            this.jingle.addICEServer(server);
        }
    }
    async updateConnections(reason) {
        if (!RTCPeerConnection) {
            return;
        }
        // A lot of situations trigger multiple changes that
        // will need connections updated. A very brief delay
        // allows those changes to get batched together.
        setTimeout(() => {
            // We don't need to have more than 1 queued update
            // at a time.
            if (this.updateQueue.length() > 1) {
                return;
            }
            this.updateQueue.push(reason || Date.now(), 0);
        }, 100);
    }
    plugin() {
        return () => {
            this.jingle.on('incoming', (session) => {
                const state = this.getState();
                const call = Selectors.getCallForRoom(state, session.peerID.split('/')[0]);
                if (call && call.joined) {
                    session.accept();
                }
                else {
                    session.end();
                }
                session.onDescriptionInfo = (changes, cb) => {
                    const connections = Selectors.getConnections(this.getState());
                    for (const content of changes.contents || []) {
                        const app = content.application;
                        if (!app) {
                            continue;
                        }
                        const screenCapture = app.screenCaptures && app.screenCaptures.length;
                        if (screenCapture) {
                            this.dispatch(Actions.updateMedia(connections[session.sid].receivingVideoMediaId, {
                                screenCapture
                            }));
                        }
                    }
                    cb();
                };
            });
            this.jingle.on('terminated', (session, reason) => {
                this.dispatch(Actions.removeConnection(session.peerID, session.sid));
                const reasonCondition = reason.condition;
                if (reasonCondition && reasonCondition !== 'success' && reasonCondition !== 'gone') {
                    console.error('Session terminated with error:', session.sid, reason);
                    this.dispatch({
                        payload: {
                            peerAddress: session.peerID,
                            updated: {
                                sessionFailed: true
                            }
                        },
                        type: Constants_1.PEER_UPDATED
                    });
                }
                // Probably terminated session because the peer is gone. Give the rest of
                // the system a chance to update before attempting to restart connections.
                setTimeout(() => {
                    this.updateConnections('session-ended');
                }, reasonCondition === 'failed-transport' ? 500 : 2000);
            });
            this.jingle.on('createdSession', (session) => {
                this.dispatch(Actions.addConnection(session.peerID, session.sid));
            });
            this.jingle.on('peerTrackAdded', (session, track, stream) => {
                // Track IDs can get reused across sessions, so we prefix with the session ID for
                // remote tracks. Local tracks always have unique IDs.
                const remoteTrackId = `${session.sid}#${track.id}`;
                this.dispatch(Actions.addRemoteMedia(session.peerID.split('/')[0], session.peerID, remoteTrackId, track, stream, false));
                if (track.kind === 'audio') {
                    this.dispatch(Actions.updateConnection(session.peerID, session.sid, {
                        receivingAudioMediaId: remoteTrackId
                    }));
                }
                if (track.kind === 'video') {
                    this.dispatch(Actions.updateConnection(session.peerID, session.sid, {
                        receivingVideoMediaId: remoteTrackId
                    }));
                }
            });
            this.jingle.on('peerTrackRemoved', (session, track) => {
                // Track IDs can get reused across sessions, so we prefix with the session ID for
                // remote tracks. Local tracks always have unique IDs.
                const remoteTrackId = `${session.sid}#${track.id}`;
                this.dispatch(Actions.removeMedia(remoteTrackId));
            });
            this.jingle.on('connectionState', (session) => {
                this.dispatch(Actions.updateConnection(session.peerID, session.sid, {
                    connectionState: session.connectionState
                }));
                if (session.connectionState === 'connected') {
                    this.dispatch(Actions.peerUpdated(session.peerID, {
                        sessionFailed: false
                    }));
                }
                // If we detect a failed ICE state and we are the responder, that means we
                // were using ICE Lite with the SFU. End the session to have the peer
                // trigger resending from the SFU.
                if (session.role === 'responder' && session.connectionState === 'failed') {
                    session.end('failed-transport');
                    return;
                }
                // Responder side doesn't restart ICE. Give initiator a chance, but do eventually end.
                if ((session.role === 'responder' && session.connectionState === 'disconnected') ||
                    session.connectionState === 'interrupted') {
                    setTimeout(() => {
                        if (session.connectionState === 'disconnected' ||
                            session.connectionState === 'interrupted') {
                            session.end('failed-transport');
                        }
                    }, 5000);
                }
            });
            this.jingle.on('mute', (session, info) => {
                const state = this.getState();
                const connections = Selectors.getConnections(state);
                if (info.name === 'audio') {
                    this.dispatch(Actions.updateMedia(connections[session.sid].receivingAudioMediaId, {
                        remoteDisabled: true
                    }));
                }
                else if (info.name === 'video') {
                    this.dispatch(Actions.updateMedia(connections[session.sid].receivingVideoMediaId, {
                        remoteDisabled: true
                    }));
                }
                else {
                    throw new Error('Invalid mute property');
                }
            });
            this.jingle.on('unmute', (session, info) => {
                const state = this.getState();
                const connections = Selectors.getConnections(state);
                if (info.name === 'audio') {
                    this.dispatch(Actions.updateMedia(connections[session.sid].receivingAudioMediaId, {
                        remoteDisabled: false
                    }));
                }
                else if (info.name === 'video') {
                    this.dispatch(Actions.updateMedia(connections[session.sid].receivingVideoMediaId, {
                        remoteDisabled: false
                    }));
                }
                else {
                    throw new Error('Invalid mute property');
                }
            });
        };
    }
    notifyPeers(media, action) {
        const state = this.getState();
        const connections = Selectors.getConnections(state);
        Object.values(Selectors.getClient(state).jingle.sessions).forEach(session => {
            const conn = connections[session.sid];
            if (conn &&
                (conn.sendingAudioMediaId === media.id || conn.sendingVideoMediaId === media.id)) {
                switch (action) {
                    case 'mute':
                        session.mute(session.role, media.kind);
                        break;
                    case 'unmute':
                        session.unmute(session.role, media.kind);
                        break;
                }
            }
        });
    }
}
exports.default = Mesh;

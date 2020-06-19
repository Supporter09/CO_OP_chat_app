"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = require("events");
const SDP = tslib_1.__importStar(require("sdp"));
const Stanza = tslib_1.__importStar(require("stanza"));
const Selectors_1 = require("../Selectors");
class SFU extends events_1.EventEmitter {
    constructor(client, browser) {
        super();
        this.minimumPeerCount = 2;
        this.peerCount = 0;
        this.enabled = false;
        this.ready = Promise.resolve();
        this.sessions = new Set();
        this.sharedMedia = new Map();
        this.jingle = client.jingle;
        this.getState = client.getState;
        this.browser = browser;
        this.jingle.on('terminated', session => {
            this.sessions.delete(session.sid);
        });
        const config = Selectors_1.getAPIConfig(this.getState()).sfuServer;
        if (config && config.url) {
            this.rpcUrl = config.url;
            this.minimumPeerCount = config.minimumPeers;
            this.client = new SFUClient(this.rpcUrl, config.password);
            this.client.on('iceConnectionState', ({ consumerId, iceConnectionState }) => {
                const session = this.jingle.sessions[consumerId];
                if (session) {
                    const pc = session.pc;
                    pc.iceConnectionState = iceConnectionState;
                    pc.emit('iceconnectionstatechange');
                }
            });
            this.ready = this.client.connect();
        }
        this.setPeerCount(0);
    }
    setPeerCount(count) {
        this.peerCount = count;
        if (!this.rpcUrl) {
            return false;
        }
        clearTimeout(this.shutdownTimeout);
        if (count >= this.minimumPeerCount && !this.enabled) {
            this.enabled = true;
            return true;
        }
        if (count < this.minimumPeerCount && this.enabled) {
            // Allow some leeway in case a peer dropped and is rejoining.
            this.shutdownTimeout = setTimeout(() => {
                // If we're still below our peer threshold, now we can shutdown.
                if (this.peerCount < this.minimumPeerCount) {
                    this.enabled = false;
                    for (const sid of this.sessions) {
                        this.jingle.sessions[sid].end();
                    }
                    this.sessions = new Set();
                    for (const [id, shared] of this.sharedMedia) {
                        this.client.send('DISPOSE', {
                            id
                        });
                        shared.pc.close();
                    }
                    this.sharedMedia = new Map();
                    this.emit('disabled');
                }
            }, 5000);
        }
        return false;
    }
    async sendMedia(track, stream, screenCapture) {
        if (!this.enabled || this.sharedMedia.has(stream.id)) {
            return;
        }
        const pc = new RTCPeerConnection({
            iceServers: this.jingle.iceServers
        });
        this.sharedMedia.set(stream.id, { pc, ready: false });
        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
                this.sharedMedia.set(stream.id, { pc, ready: true });
                this.emit('media-ready:' + stream.id);
                const connections = Selectors_1.getConnections(this.getState());
                for (const [sid, conn] of Object.entries(connections)) {
                    if (conn.sendingAudioMediaId === track.id || conn.sendingVideoMediaId === track.id) {
                        this.jingle.sessions[sid].end();
                    }
                }
                this.emit('media-ready');
            }
            if (pc.iceConnectionState === 'failed') {
                this.sharedMedia.delete(stream.id);
                this.emit('media-failed:' + stream.id);
                this.emit('media-failed');
            }
        };
        try {
            for (const streamTrack of stream.getTracks()) {
                if (streamTrack.kind === 'audio') {
                    pc.addTrack(streamTrack, stream);
                }
                else {
                    pc.addTransceiver(streamTrack, {
                        sendEncodings: !screenCapture
                            ? [
                                { rid: 'low', active: true, scaleResolutionDownBy: 4 },
                                { rid: 'medium', active: true, scaleResolutionDownBy: 2 },
                                { rid: 'high', active: true }
                            ]
                            : undefined,
                        streams: [stream]
                    });
                }
            }
            const offer = await pc.createOffer();
            if (!screenCapture && (this.browser === 'chrome' || this.browser === 'safari')) {
                const sections = SDP.splitSections(offer.sdp);
                const header = sections.shift();
                for (const [sdpMlineIndex, media] of sections.entries()) {
                    const mline = SDP.parseMLine(media);
                    if (mline.kind !== 'video') {
                        continue;
                    }
                    const match = media.match(/a=ssrc:(\d+) cname:(.*)\r\n/);
                    const msid = media.match(/a=ssrc:(\d+) msid:(.*)\r\n/);
                    if (match && msid) {
                        const lines = media
                            .trim()
                            .split('\r\n')
                            .filter(line => {
                            return !(line.startsWith('a=ssrc:') || line.startsWith('a=ssrc-group:FID'));
                        });
                        const videoSSRC1 = parseInt(match[1], 10);
                        const rtxSSRC1 = SDP.matchPrefix(media, 'a=ssrc-group:FID ')[0].split(' ')[2];
                        lines.push('a=ssrc:' + videoSSRC1 + ' cname:' + match[2]);
                        lines.push('a=ssrc:' + videoSSRC1 + ' msid:' + msid[2]);
                        lines.push('a=ssrc:' + rtxSSRC1 + ' cname:' + match[2]);
                        lines.push('a=ssrc:' + rtxSSRC1 + ' msid:' + msid[2]);
                        const videoSSRC2 = videoSSRC1 + 1;
                        const rtxSSRC2 = videoSSRC1 + 2;
                        lines.push('a=ssrc:' + videoSSRC2 + ' cname:' + match[2]);
                        lines.push('a=ssrc:' + videoSSRC2 + ' msid:' + msid[2]);
                        lines.push('a=ssrc:' + rtxSSRC2 + ' cname:' + match[2]);
                        lines.push('a=ssrc:' + rtxSSRC2 + ' msid:' + msid[2]);
                        const videoSSRC3 = videoSSRC1 + 3;
                        const rtxSSRC3 = videoSSRC1 + 4;
                        lines.push('a=ssrc:' + videoSSRC3 + ' cname:' + match[2]);
                        lines.push('a=ssrc:' + videoSSRC3 + ' msid:' + msid[2]);
                        lines.push('a=ssrc:' + rtxSSRC3 + ' cname:' + match[2]);
                        lines.push('a=ssrc:' + rtxSSRC3 + ' msid:' + msid[2]);
                        lines.push('a=ssrc-group:FID ' + videoSSRC1 + ' ' + rtxSSRC1);
                        lines.push('a=ssrc-group:FID ' + videoSSRC2 + ' ' + rtxSSRC2);
                        lines.push('a=ssrc-group:FID ' + videoSSRC3 + ' ' + rtxSSRC3);
                        lines.push('a=ssrc-group:SIM ' + videoSSRC1 + ' ' + videoSSRC2 + ' ' + videoSSRC3);
                        sections[sdpMlineIndex] = lines.join('\r\n') + '\r\n';
                        offer.sdp = [header, ...sections].join('');
                    }
                }
            }
            await pc.setLocalDescription(offer);
            await this.ready;
            const answer = await this.client.send('INGEST', {
                id: stream.id,
                sdp: offer.sdp
            });
            await pc.setRemoteDescription({ type: 'answer', sdp: answer.sdp });
        }
        catch (err) {
            this.sharedMedia.delete(stream.id);
            this.emit('media-failed:' + stream.id);
            this.emit('media-failed');
        }
    }
    async setProfile(sessionId, profile) {
        if (!this.sessions.has(sessionId)) {
            return;
        }
        return this.client.send('SET_CONSUMER_PROFILE', {
            id: sessionId,
            profile
        });
    }
    requestProfile(trackId, profile) {
        const connections = Selectors_1.getConnections(this.getState());
        for (const [sessionId, conn] of Object.entries(connections)) {
            if (conn.receivingVideoMediaId === trackId) {
                return this.jingle.sessions[sessionId].send('description-info', {
                    contents: [
                        {
                            application: {
                                applicationType: Stanza.Namespaces.NS_JINGLE_RTP_1,
                                simulcast: { profile }
                            },
                            creator: 'initiator',
                            name: 'video'
                        }
                    ]
                });
            }
        }
    }
    createPeerConnection(session, options) {
        if (this.enabled && session.isInitiator) {
            this.sessions.add(session.sid);
            const state = this.getState();
            const peer = Selectors_1.getPeerByAddress(state, session.peerID);
            const room = Selectors_1.getRoomByAddress(state, Stanza.JID.toBare(session.peerID));
            return new ProxyPeerConnection(session.sid, room.id, peer.id, this, this.client);
        }
        else {
            return new RTCPeerConnection(options);
        }
    }
    getInfoForPeer(peerAddress) {
        return Selectors_1.getPeerByAddress(this.getState(), peerAddress);
    }
    async waitForMedia(id) {
        const shared = this.sharedMedia.get(id);
        if (!shared || !shared.ready) {
            return new Promise((resolve, reject) => {
                const success = () => {
                    this.off('media-failed:' + id, failed);
                    resolve();
                };
                const failed = () => {
                    this.off('media-ready:' + id, success);
                    reject();
                };
                this.once('media-ready:' + id, success);
                this.once('media-failed:' + id, failed);
            });
        }
    }
}
exports.default = SFU;
class SFUClient extends events_1.EventEmitter {
    constructor(url, credential) {
        super();
        this.connected = false;
        this.disconnected = false;
        this.callbacks = new Map();
        this.url = url;
        this.credential = credential;
    }
    async connect() {
        if (this.connected) {
            return;
        }
        if (this.connecting) {
            return this.connecting;
        }
        this.connecting = new Promise((resolve, reject) => {
            this.callbacks = new Map();
            this.socket = new WebSocket(this.url);
            this.socket.onopen = async () => {
                this.send('AUTH', {
                    token: this.credential
                }, true).then(() => {
                    this.connected = true;
                    this.connecting = undefined;
                    resolve();
                });
            };
            this.socket.onmessage = event => {
                const packet = JSON.parse(event.data);
                if (this.callbacks.has(packet.id) && (packet.result || packet.error)) {
                    const { resolve: resolveMethod, reject: rejectMethod } = this.callbacks.get(packet.id);
                    if (packet.result) {
                        resolveMethod(packet.result);
                    }
                    else if (packet.error) {
                        rejectMethod(packet.error);
                    }
                }
                if (packet.method === 'CONSUMER_ICE_STATE') {
                    this.emit('iceConnectionState', {
                        consumerId: packet.params.id,
                        iceConnectionState: packet.params.iceConnectionState
                    });
                }
            };
            this.socket.onclose = () => {
                const wasConnected = this.connected;
                this.callbacks = new Map();
                this.connected = false;
                if (!wasConnected) {
                    reject();
                }
            };
        });
        return this.connecting;
    }
    disconnect() {
        this.disconnected = true;
        this.socket.close();
    }
    async send(method, params, immediate) {
        if (!immediate) {
            await this.connect();
        }
        return new Promise((resolve, reject) => {
            const id = Stanza.Utils.uuid();
            this.callbacks.set(id, { resolve, reject });
            this.socket.send(JSON.stringify({
                id,
                jsonrpc: '2.0',
                method,
                params
            }));
        });
    }
}
function newSignalingState(local, currentState) {
    switch (currentState) {
        case 'stable':
            return local ? 'have-local-offer' : 'have-remote-offer';
        case 'have-local-offer':
            return local ? currentState : 'stable';
        case 'have-remote-offer':
            return local ? 'stable' : currentState;
    }
}
class ProxyPeerConnection extends events_1.EventEmitter {
    constructor(id, roomId, peerId, sfu, client) {
        super();
        this.id = id;
        this.roomId = roomId;
        this.peerId = peerId;
        this.sfu = sfu;
        this.client = client;
        this.iceConnectionState = 'new';
        this.signalingState = 'stable';
        this.activated = false;
    }
    addTrack(track, stream) {
        this.sourceId = stream.id;
        this.includeAudio = this.includeAudio || track.kind === 'audio';
        this.includeVideo = this.includeVideo || track.kind === 'video';
    }
    close() {
        if (this.activated) {
            this.client
                .send('REMOVE_CONSUMER', {
                id: this.id
            })
                .catch(err => {
                this.activated = false;
            });
        }
    }
    getReceivers() {
        return [];
    }
    getSenders() {
        return [];
    }
    addEventListener(event, handler) {
        this.on(event, handler);
    }
    set onicecandidate(handler) {
        this.on('icecandidate', handler);
    }
    set oniceconnectionstatechange(handler) {
        this.on('iceconnectionstatechange', handler);
    }
    async getStats() {
        return new Map();
    }
    async addIceCandidate(cand) {
        return;
    }
    async createOffer() {
        await this.sfu.waitForMedia(this.sourceId);
        const offer = await this.client.send('CREATE_CONSUMER', {
            audio: this.includeAudio,
            id: this.id,
            peerId: this.peerId,
            roomId: this.roomId,
            source: this.sourceId,
            video: this.includeVideo
        });
        this.activated = true;
        return {
            sdp: offer.sdp,
            type: 'offer'
        };
    }
    async createAnswer() {
        return;
    }
    async setLocalDescription(desc) {
        return;
    }
    async setRemoteDescription(desc) {
        await this.client.send('START_CONSUMER', {
            id: this.id,
            sdp: desc.sdp
        });
    }
}

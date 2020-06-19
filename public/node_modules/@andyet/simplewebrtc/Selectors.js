"use strict";
// getConnectionForMedia
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
/**
 * @description
 *
 * @public
 *
 */
function getAPIConfig(state) {
    return state.simplewebrtc.api.config;
}
exports.getAPIConfig = getAPIConfig;
/**
 * @description
 *
 * @public
 *
 */
function getUserToken(state) {
    return state.simplewebrtc.api.token;
}
exports.getUserToken = getUserToken;
/**
 * @description
 *
 * @public
 *
 */
function getUser(state) {
    return state.simplewebrtc.user;
}
exports.getUser = getUser;
/**
 * @description
 *
 * @public
 *
 */
function getUserCustomerData(state) {
    return getAPIConfig(state).customerData;
}
exports.getUserCustomerData = getUserCustomerData;
/**
 * @description
 *
 * @public
 *
 */
function getConfigURL(state) {
    return state.simplewebrtc.api.configUrl;
}
exports.getConfigURL = getConfigURL;
/**
 * @description
 *
 * @public
 *
 */
function getClient(state) {
    return state.simplewebrtc.api.signalingClient;
}
exports.getClient = getClient;
/**
 * @description
 *
 * @public
 *
 */
function getQueuedTelemetry(state) {
    return state.simplewebrtc.api.queuedTelemetry;
}
exports.getQueuedTelemetry = getQueuedTelemetry;
/**
 * @description
 *
 * @public
 *
 */
function getConnectionState(state) {
    return state.simplewebrtc.api.connectionState;
}
exports.getConnectionState = getConnectionState;
/**
 * @description
 *
 * @public
 *
 */
function getUserDisplayName(state) {
    return state.simplewebrtc.user.displayName;
}
exports.getUserDisplayName = getUserDisplayName;
/**
 * @description
 *
 * @public
 *
 */
function getUserDataForRoom(state, roomAddress) {
    const config = getAPIConfig(state);
    const room = getRoomByAddress(state, roomAddress);
    const call = getCallForRoom(state, roomAddress);
    const localAudio = getLocalMedia(state, 'audio');
    const recentSpeaking = localAudio
        .filter(a => a.lastSpokeAt)
        .sort((a, b) => {
        const lastA = a.lastSpokeAt ? a.lastSpokeAt.valueOf() : 0;
        const lastB = b.lastSpokeAt ? b.lastSpokeAt.valueOf() : 0;
        return lastA - lastB;
    });
    return {
        address: room.selfAddress,
        affiliation: room.selfAffiliation,
        chatState: 'active',
        customerData: getAPIConfig(state).customerData,
        displayName: getUserDisplayName(state),
        id: config.id,
        joinedCall: call.joined,
        joinedCallAt: call.joinedAt,
        joinedRoomAt: room.joinedAt,
        lastSpokeAt: recentSpeaking.length ? recentSpeaking[0].lastSpokeAt : undefined,
        muted: false,
        requestingAttention: false,
        requestingMedia: getDesiredMediaTypes(state, roomAddress),
        role: room.selfRole,
        roomAddress,
        rtt: '',
        speaking: userIsSpeaking(state, true),
        volume: 0,
        volumeLimit: 0.8
    };
}
exports.getUserDataForRoom = getUserDataForRoom;
/**
 * @description
 *
 * @public
 *
 */
function getDesiredMediaTypes(state, roomAddress) {
    const defaultRequest = state.simplewebrtc.user.requestingMedia;
    if (roomAddress) {
        const call = getCallForRoom(state, roomAddress);
        if (call) {
            return call.requestingMedia || defaultRequest;
        }
    }
    return defaultRequest;
}
exports.getDesiredMediaTypes = getDesiredMediaTypes;
/**
 * @description
 *
 * @public
 *
 */
function getPushToTalkEnabled(state) {
    return state.simplewebrtc.user.pushToTalk;
}
exports.getPushToTalkEnabled = getPushToTalkEnabled;
/**
 * @description
 *
 * @public
 *
 */
function getPeerByAddress(state, peerAddress) {
    return state.simplewebrtc.peers[peerAddress];
}
exports.getPeerByAddress = getPeerByAddress;
/**
 * @description
 *
 * @public
 *
 */
function getRooms(state) {
    return state.simplewebrtc.rooms;
}
exports.getRooms = getRooms;
/**
 * @description
 *
 * @public
 *
 */
function getRoomByAddress(state, roomAddress) {
    return state.simplewebrtc.rooms[roomAddress];
}
exports.getRoomByAddress = getRoomByAddress;
/**
 * @description
 *
 * @public
 *
 */
function getRoomByProvidedName(state, roomName) {
    for (const roomAddress of Object.keys(state.simplewebrtc.rooms)) {
        if (state.simplewebrtc.rooms[roomAddress].providedName === roomName) {
            return state.simplewebrtc.rooms[roomAddress];
        }
    }
}
exports.getRoomByProvidedName = getRoomByProvidedName;
/**
 * @description
 *
 * @public
 *
 */
function getPeersForRoom(state, roomAddress) {
    const peers = [];
    for (const peerAddress of Object.keys(state.simplewebrtc.peers)) {
        if (state.simplewebrtc.peers[peerAddress].roomAddress === roomAddress) {
            peers.push(state.simplewebrtc.peers[peerAddress]);
        }
    }
    return peers;
}
exports.getPeersForRoom = getPeersForRoom;
/**
 * @description
 *
 * @public
 *
 */
function getChatsForRoom(state, roomAddress) {
    const chats = [];
    for (const id of Object.keys(state.simplewebrtc.chats)) {
        const chat = state.simplewebrtc.chats[id];
        if (chat.roomAddress === roomAddress) {
            chats.push(chat);
        }
    }
    return chats.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0));
}
exports.getChatsForRoom = getChatsForRoom;
/**
 * @description
 *
 * @public
 *
 */
function getGroupedChatsForRoom(state, roomAddress, maxDuration = 5 * 60) {
    const groupedChats = [];
    const chats = getChatsForRoom(state, roomAddress);
    let lastGroup;
    for (const chat of chats) {
        const newSender = !lastGroup || chat.senderAddress !== lastGroup.senderAddress;
        const prevChat = lastGroup ? lastGroup.chats[lastGroup.chats.length - 1] : undefined;
        const newDisplayName = !lastGroup || (prevChat && chat.displayName && chat.displayName !== prevChat.displayName);
        let expired = false;
        if (maxDuration) {
            // Also start a new group if the current group has lasted for a significant amount of time.
            expired =
                !lastGroup || Number(chat.time) > Number(lastGroup.chats[0].time) + maxDuration * 1000;
        }
        if (newSender || newDisplayName || expired) {
            let peer = getPeerByAddress(state, chat.senderAddress) || {};
            if (chat.direction === 'outgoing') {
                peer = getUserDataForRoom(state, roomAddress);
            }
            lastGroup = {
                chats: [chat],
                direction: chat.direction,
                displayName: peer.displayName || chat.displayName,
                endTime: chat.time,
                peer,
                senderAddress: chat.senderAddress,
                startTime: chat.time
            };
            groupedChats.push(lastGroup);
        }
        else if (lastGroup) {
            lastGroup.chats.push(chat);
            lastGroup.endTime = chat.time;
        }
    }
    return groupedChats;
}
exports.getGroupedChatsForRoom = getGroupedChatsForRoom;
/**
 * @description
 *
 * @public
 *
 */
function getLastSentChat(state, roomAddress) {
    const chats = getChatsForRoom(state, roomAddress);
    return chats.filter(c => c.direction === Constants_1.DIRECTION_OUTGOING).slice(-1)[0];
}
exports.getLastSentChat = getLastSentChat;
/**
 * @description
 *
 * @public
 *
 */
function getChatComposers(state, roomAddress) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.peers)) {
        const peer = state.simplewebrtc.peers[id];
        if (peer.roomAddress === roomAddress && peer.chatState === 'composing') {
            results.push(peer);
        }
    }
    return results;
}
exports.getChatComposers = getChatComposers;
/**
 * @description
 *
 * @public
 *
 */
function getCallForRoom(state, roomAddress) {
    return state.simplewebrtc.calls[roomAddress];
}
exports.getCallForRoom = getCallForRoom;
/**
 * @description
 *
 * @public
 *
 */
function getMedia(state) {
    return state.simplewebrtc.media;
}
exports.getMedia = getMedia;
/**
 * @description
 *
 * @public
 *
 */
function getMediaTrack(state, id) {
    return state.simplewebrtc.media[id];
}
exports.getMediaTrack = getMediaTrack;
/**
 * @description
 *
 * @public
 *
 */
function getDeviceForMediaTrack(state, id) {
    const track = getMediaTrack(state, id);
    if (!track) {
        return;
    }
    let deviceId;
    const deviceLabel = track.track.label;
    const deviceKind = `${track.kind}input`;
    if (track.track.getSettings) {
        const settings = track.track.getSettings();
        deviceId = settings.deviceId;
    }
    const devices = state.simplewebrtc.devices.devices;
    if (deviceId) {
        for (const device of devices) {
            if (device.deviceId === deviceId) {
                return device;
            }
        }
    }
    for (const device of devices) {
        if (deviceLabel === device.label && deviceKind === device.kind) {
            return device;
        }
    }
}
exports.getDeviceForMediaTrack = getDeviceForMediaTrack;
/**
 * @description
 *
 * @public
 *
 */
function getDevices(state, kind) {
    const devices = state.simplewebrtc.devices.devices;
    if (!kind) {
        return devices;
    }
    return devices.filter(device => device.kind === kind);
}
exports.getDevices = getDevices;
/**
 * @description
 *
 * @public
 *
 */
function getDevicePermissions(state) {
    const devices = state.simplewebrtc.devices;
    return {
        cameraPermissionDenied: devices.cameraPermissionDenied,
        cameraPermissionGranted: devices.cameraPermissionGranted,
        hasAudioOutput: devices.hasAudioOutput,
        hasCamera: devices.hasCamera,
        hasMicrophone: devices.hasMicrophone,
        microphonePermissionDenied: devices.microphonePermissionDenied,
        microphonePermissionGranted: devices.microphonePermissionGranted,
        requestingCameraCapture: devices.requestingCameraCapture,
        requestingCapture: devices.requestingCapture,
        requestingMicrophoneCapture: devices.requestingMicrophoneCapture
    };
}
exports.getDevicePermissions = getDevicePermissions;
/**
 * @description
 *
 * @public
 *
 */
function getMediaForPeer(state, peerAddress, kind) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.media)) {
        const media = state.simplewebrtc.media[id];
        if (media.owner === peerAddress) {
            if (!kind || kind === media.kind) {
                results.push(media);
            }
        }
    }
    return results;
}
exports.getMediaForPeer = getMediaForPeer;
/**
 * @description
 *
 * @public
 *
 */
function getLocalMedia(state, kind) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.media)) {
        const media = state.simplewebrtc.media[id];
        if (media.source === 'local') {
            if (!kind || kind === media.kind) {
                results.push(media);
            }
        }
    }
    return results.sort((a, b) => a.createdAt - b.createdAt);
}
exports.getLocalMedia = getLocalMedia;
/**
 * @description
 *
 * @public
 *
 */
function getRemoteMedia(state, kind) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.media)) {
        const media = state.simplewebrtc.media[id];
        if (media.source === 'remote') {
            if (!kind || kind === media.kind) {
                results.push(media);
            }
        }
    }
    return results;
}
exports.getRemoteMedia = getRemoteMedia;
/**
 * @description
 *
 * @public
 *
 */
function getSharedMedia(state, kind) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.media)) {
        const media = state.simplewebrtc.media[id];
        if (media.source === 'local' && media.shared) {
            if (!kind || kind === media.kind) {
                results.push(media);
            }
        }
    }
    return results;
}
exports.getSharedMedia = getSharedMedia;
/**
 * @description
 *
 * @public
 *
 */
function getAudioOutputDevice(state) {
    return state.simplewebrtc.user.audioOutputDeviceId;
}
exports.getAudioOutputDevice = getAudioOutputDevice;
/**
 * @description
 *
 * @public
 *
 */
function getGlobalVolumeLimit(state) {
    return state.simplewebrtc.user.globalVolumeLimit;
}
exports.getGlobalVolumeLimit = getGlobalVolumeLimit;
/**
 * @description
 *
 * @public
 *
 */
function getJoinedCalls(state) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.calls)) {
        const call = state.simplewebrtc.calls[id];
        const room = getRoomByAddress(state, call.roomAddress);
        if (call.joined && room && room.joined) {
            results.push(call);
        }
    }
    return results;
}
exports.getJoinedCalls = getJoinedCalls;
/**
 * @description
 *
 * @public
 *
 */
function getPeersForCall(state, roomAddress) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.peers)) {
        const peer = state.simplewebrtc.peers[id];
        if (peer.roomAddress === roomAddress && peer.joinedCall) {
            results.push(peer);
        }
    }
    return results;
}
exports.getPeersForCall = getPeersForCall;
/**
 * @description
 *
 * @public
 *
 */
function getActiveSpeakersForCall(state, roomAddress) {
    const results = [];
    for (const id of Object.keys(state.simplewebrtc.peers)) {
        const peer = state.simplewebrtc.peers[id];
        if (peer.roomAddress === roomAddress && peer.joinedCall && peer.speaking) {
            results.push(peer);
        }
    }
    return results;
}
exports.getActiveSpeakersForCall = getActiveSpeakersForCall;
/**
 * @description
 *
 * @public
 *
 */
function getConnections(state) {
    return state.simplewebrtc.connections;
}
exports.getConnections = getConnections;
/**
 * @description
 *
 * @public
 *
 */
function getConnectionsForPeer(state, peerAddress) {
    const results = [];
    const connections = getConnections(state);
    for (const id of Object.keys(connections)) {
        const connection = connections[id];
        if (connection.peerAddress === peerAddress) {
            results.push(connection);
        }
    }
    return results;
}
exports.getConnectionsForPeer = getConnectionsForPeer;
/**
 * @description
 *
 * @public
 *
 */
function countPeersWantingAudio(state) {
    let count = 0;
    for (const id of Object.keys(state.simplewebrtc.peers)) {
        const peer = state.simplewebrtc.peers[id];
        if (peer.requestingMedia === 'audio') {
            count += 1;
        }
    }
    return count;
}
exports.countPeersWantingAudio = countPeersWantingAudio;
/**
 * @description
 *
 * @public
 *
 */
function countPeersWantingVideo(state) {
    let count = 0;
    for (const id of Object.keys(state.simplewebrtc.peers)) {
        const peer = state.simplewebrtc.peers[id];
        if (peer.requestingMedia === 'video') {
            count += 1;
        }
    }
    return count;
}
exports.countPeersWantingVideo = countPeersWantingVideo;
/**
 * @description
 *
 * @public
 */
function isSupportedBrowser(state) {
    return !!('RTCPeerConnection' in window) && !!('mediaDevices' in navigator);
}
exports.isSupportedBrowser = isSupportedBrowser;
/**
 * @description
 *
 * @private
 */
function userIsSpeaking(state, sharedAudioOnly = true) {
    const localAudio = getLocalMedia(state, 'audio');
    return (localAudio.filter(a => !a.localDisabled && !a.externalDisabled && a.speaking && (sharedAudioOnly ? a.shared : true)).length > 0);
}
exports.userIsSpeaking = userIsSpeaking;
/**
 * @description
 *
 * @private
 */
function userIsSpeakingWhileMuted(state, sharedAudioOnly = true) {
    const localAudio = getLocalMedia(state, 'audio');
    return (localAudio.filter(a => (a.localDisabled || a.externalDisabled) && a.speaking && (sharedAudioOnly ? a.shared : true)).length > 0);
}
exports.userIsSpeakingWhileMuted = userIsSpeakingWhileMuted;
/**
 * @description
 *
 * @private
 */
function getVideoResolutionTiers(state) {
    return state.simplewebrtc.api.videoResolutionTiers || [];
}
exports.getVideoResolutionTiers = getVideoResolutionTiers;

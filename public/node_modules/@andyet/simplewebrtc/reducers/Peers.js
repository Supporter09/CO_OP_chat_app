"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {};
function addPeer(state, action) {
    if (state[action.payload.peerAddress]) {
        return updatePeer(state, {
            payload: {
                peerAddress: action.payload.peerAddress,
                updated: action.payload
            },
            type: Constants_1.PEER_UPDATED
        });
    }
    const now = new Date(Date.now());
    return {
        ...state,
        [action.payload.peerAddress]: {
            address: action.payload.peerAddress,
            affiliation: action.payload.affiliation,
            chatState: 'active',
            customerData: action.payload.customerData || {},
            displayName: action.payload.displayName || '',
            id: action.payload.id,
            joinedCall: action.payload.joinedCall || false,
            joinedCallAt: action.payload.joinedCall ? now : undefined,
            joinedRoomAt: now,
            lastSpokeAt: undefined,
            muted: false,
            requestingAttention: false,
            requestingMedia: action.payload.requestingMedia || 'none',
            role: action.payload.role,
            roomAddress: action.payload.roomAddress,
            rtt: '',
            speaking: false,
            userAddress: action.payload.userAddress,
            volume: -Infinity,
            volumeLimit: 0.8
        }
    };
}
function updatePeer(state, action) {
    const existingPeer = state[action.payload.peerAddress];
    if (!existingPeer) {
        return state;
    }
    const now = new Date(Date.now());
    let lastSpokeAt = existingPeer.lastSpokeAt;
    if (existingPeer.speaking && action.payload.updated.speaking === false) {
        lastSpokeAt = now;
    }
    let leftCall = false;
    if (existingPeer.joinedCall && action.payload.updated.joinedCall === false) {
        leftCall = true;
    }
    return {
        ...state,
        [action.payload.peerAddress]: {
            ...existingPeer,
            ...action.payload.updated,
            joinedCallAt: leftCall ? undefined : existingPeer.joinedCallAt || now,
            lastSpokeAt
        }
    };
}
function removePeer(state, action) {
    const result = { ...state };
    delete result[action.payload.peerAddress];
    return result;
}
function removeRoomPeers(state, action) {
    const result = { ...state };
    for (const peerAddress of Object.keys(state)) {
        const peer = state[peerAddress];
        if (peer.roomAddress === action.payload.roomAddress) {
            delete result[peerAddress];
        }
    }
    return result;
}
function default_1(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Constants_1.CONNECTION_STATE_CHANGE:
            return action.payload === 'disconnected' ? {} : state;
        case Constants_1.PEER_ONLINE:
            return addPeer(state, action);
        case Constants_1.PEER_OFFLINE:
            return removePeer(state, action);
        case Constants_1.PEER_UPDATED:
            return updatePeer(state, action);
        case Constants_1.LEAVE_ROOM:
            return removeRoomPeers(state, action);
    }
    return state;
}
exports.default = default_1;

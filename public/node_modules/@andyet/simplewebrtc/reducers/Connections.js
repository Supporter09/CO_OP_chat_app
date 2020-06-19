"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {};
function addConnection(state, action) {
    return {
        ...state,
        [action.payload.id]: {
            connectionState: '',
            id: action.payload.id,
            peerAddress: action.payload.peerAddress,
            receivingAudioMediaId: '',
            receivingVideoMediaId: '',
            restarting: false,
            roomAddress: action.payload.roomAddress,
            sendingAudioMediaId: '',
            sendingVideoMediaId: '',
            sessionState: ''
        }
    };
}
function updateConnection(state, action) {
    if (!state[action.payload.id]) {
        return state;
    }
    return {
        ...state,
        [action.payload.id]: {
            ...(state[action.payload.id] || {}),
            peerAddress: action.payload.peerAddress,
            ...action.payload.updated
        }
    };
}
function removeConnection(state, action) {
    const result = { ...state };
    delete result[action.payload.id];
    return result;
}
function default_1(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Constants_1.PEER_CONNECTION_ADDED:
            return addConnection(state, action);
        case Constants_1.PEER_CONNECTION_UPDATED:
            return updateConnection(state, action);
        case Constants_1.PEER_CONNECTION_REMOVED:
            return removeConnection(state, action);
    }
    return state;
}
exports.default = default_1;

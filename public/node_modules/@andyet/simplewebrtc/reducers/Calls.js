"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {};
function addCall(state, action) {
    return {
        ...state,
        [action.payload.roomAddress]: {
            allowedAudioRoles: ['moderator', 'participant'],
            allowedMedia: 'video',
            allowedVideoRoles: ['moderator', 'participant'],
            joined: false,
            joinedAt: undefined,
            recordable: false,
            recordingState: 'offline',
            requestingMedia: undefined,
            roomAddress: action.payload.roomAddress,
            state: 'active'
        }
    };
}
function updatedCall(state, action) {
    if (!state[action.payload.roomAddress]) {
        state = addCall(state, action);
    }
    if (action.type === Constants_1.JOIN_CALL) {
        return {
            ...state,
            [action.payload.roomAddress]: {
                ...state[action.payload.roomAddress],
                joined: true,
                joinedAt: new Date(Date.now()),
                requestingMedia: action.payload.desiredMedia
            }
        };
    }
    if (action.type === Constants_1.LEAVE_CALL) {
        return {
            ...state,
            [action.payload.roomAddress]: {
                ...state[action.payload.roomAddress],
                joined: false,
                joinedAt: undefined,
                requestingMedia: undefined
            }
        };
    }
    if (action.type === Constants_1.SET_CALL_PREFERENCE) {
        return {
            ...state,
            [action.payload.roomAddress]: {
                ...state[action.payload.roomAddress],
                requestingMedia: action.payload.desiredMedia
            }
        };
    }
    return state;
}
function removeCall(state, action) {
    const result = { ...state };
    delete result[action.payload.roomAddress];
    return result;
}
function default_1(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Constants_1.JOIN_CALL:
            return updatedCall(state, action);
        case Constants_1.LEAVE_CALL:
            return updatedCall(state, action);
        case Constants_1.LEAVE_ROOM:
            return removeCall(state, action);
        case Constants_1.JOIN_ROOM_SUCCESS:
            return updatedCall(state, action);
        case Constants_1.SET_CALL_PREFERENCE:
            return updatedCall(state, action);
    }
    return state;
}
exports.default = default_1;

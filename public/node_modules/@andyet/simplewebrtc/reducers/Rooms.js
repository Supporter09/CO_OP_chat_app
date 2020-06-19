"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {};
function addRoom(state, action) {
    return {
        ...state,
        [action.payload.roomAddress]: {
            address: action.payload.roomAddress,
            autoJoinCall: !!action.payload.autoJoinCall,
            banned: false,
            id: '',
            joined: false,
            joinedAt: undefined,
            password: action.payload.password || '',
            passwordRequired: false,
            providedName: action.payload.providedRoomName,
            providedPassword: action.payload.providedPassword,
            roomNotStarted: false,
            roomState: 'joining',
            selfAddress: '',
            selfAffiliation: 'none',
            selfRole: 'none',
            unreadCount: 0
        }
    };
}
function updateRoom(state, action) {
    const existingRoom = state[action.payload.roomAddress];
    if (!existingRoom) {
        return state;
    }
    if (action.type === Constants_1.JOIN_ROOM_FAILED) {
        let roomState = 'failed';
        if (action.payload.passwordRequired) {
            roomState = 'password-required';
        }
        if (action.payload.roomNotStarted) {
            roomState = 'waiting';
        }
        if (action.payload.banned) {
            roomState = 'banned';
        }
        return {
            ...state,
            [action.payload.roomAddress]: {
                ...existingRoom,
                banned: !!action.payload.banned,
                joined: false,
                joinedAt: undefined,
                password: '',
                passwordRequired: !!action.payload.passwordRequired,
                roomNotStarted: !!action.payload.roomNotStarted,
                roomState
            }
        };
    }
    return {
        ...state,
        [action.payload.roomAddress]: {
            ...existingRoom,
            id: action.payload.id,
            joined: true,
            joinedAt: existingRoom.joinedAt || new Date(Date.now()),
            roomState: 'joined',
            selfAddress: action.payload.selfAddress,
            selfAffiliation: action.payload.affiliation,
            selfRole: action.payload.role
        }
    };
}
function updateRoomLock(state, action) {
    const existingRoom = state[action.payload.roomAddress];
    if (!existingRoom) {
        return state;
    }
    switch (action.type) {
        case Constants_1.LOCK_ROOM:
            return {
                ...state,
                [action.payload.roomAddress]: {
                    ...existingRoom,
                    providedPassword: action.payload.password || ''
                }
            };
        case Constants_1.ROOM_LOCKED:
            return {
                ...state,
                [action.payload.roomAddress]: {
                    ...existingRoom,
                    password: action.payload.password || '',
                    passwordRequired: true,
                    providedPassword: undefined
                }
            };
        case Constants_1.ROOM_UNLOCKED:
            return {
                ...state,
                [action.payload.roomAddress]: {
                    ...existingRoom,
                    password: '',
                    passwordRequired: false,
                    providedPassword: undefined
                }
            };
    }
    return state;
}
function removeRoom(state, action) {
    const result = { ...state };
    delete result[action.payload.roomAddress];
    return result;
}
function default_1(state = INITIAL_STATE, action) {
    if (action.type === Constants_1.CONNECTION_STATE_CHANGE) {
        if (action.payload !== 'disconnected') {
            return state;
        }
        const newState = {};
        for (const [roomAddress, room] of Object.entries(state)) {
            newState[roomAddress] = {
                ...room,
                joined: false,
                joinedAt: undefined,
                roomState: 'interrupted'
            };
        }
        return newState;
    }
    switch (action.type) {
        case Constants_1.SELF_UPDATED:
            return updateRoom(state, action);
        case Constants_1.JOIN_ROOM:
            return addRoom(state, action);
        case Constants_1.JOIN_ROOM_FAILED:
            return updateRoom(state, action);
        case Constants_1.JOIN_ROOM_SUCCESS:
            return updateRoom(state, action);
        case Constants_1.LEAVE_ROOM:
            return removeRoom(state, action);
        case Constants_1.LOCK_ROOM:
        case Constants_1.UNLOCK_ROOM:
        case Constants_1.ROOM_LOCKED:
        case Constants_1.ROOM_UNLOCKED:
            return updateRoomLock(state, action);
    }
    return state;
}
exports.default = default_1;

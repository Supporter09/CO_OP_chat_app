"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {};
function addMedia(state, action) {
    return {
        ...state,
        [action.payload.id]: action.payload
    };
}
// TODO: typedoc merges this definition with the action of the same name making it
// impossible to generate docs for the action
function removeMediaReducer(state, action) {
    const result = { ...state };
    delete result[action.payload.id];
    return result;
}
function updatedMedia(state, action) {
    const existing = state[action.payload.id];
    if (!existing) {
        return state;
    }
    return {
        ...state,
        [action.payload.id]: {
            ...existing,
            ...action.payload.updated
        }
    };
}
function removeCallMedia(state, action) {
    const result = { ...state };
    for (const id of Object.keys(state)) {
        const media = state[id];
        if (media.source === 'remote' && media.roomAddress === action.payload.roomAddress) {
            delete result[id];
        }
    }
    return result || {};
}
function default_1(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Constants_1.ADD_MEDIA:
            return addMedia(state, action);
        case Constants_1.REMOVE_MEDIA:
            return removeMediaReducer(state, action);
        case Constants_1.MEDIA_UPDATED:
            return updatedMedia(state, action);
        case Constants_1.LEAVE_CALL:
            return removeCallMedia(state, action);
    }
    return state;
}
exports.default = default_1;

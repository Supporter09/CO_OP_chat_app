"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {};
function addChat(state, action) {
    if (action.type === Constants_1.CHAT_INCOMING) {
        const chat = action.payload;
        const existing = state[chat.id];
        if (chat.replace) {
            const original = state[chat.replace];
            if (original && original.direction === Constants_1.DIRECTION_OUTGOING) {
                return {
                    ...state,
                    [chat.id]: {
                        ...existing,
                        acked: true,
                        body: chat.body
                    }
                };
            }
        }
        if (!existing) {
            return {
                ...state,
                [chat.id]: chat
            };
        }
        if (existing.direction === Constants_1.DIRECTION_OUTGOING) {
            return {
                ...state,
                [chat.id]: {
                    ...existing,
                    acked: true,
                    body: chat.body,
                    time: chat.time
                }
            };
        }
    }
    if (action.type === Constants_1.CHAT_OUTGOING) {
        const chat = action.payload;
        const existing = state[chat.id];
        return {
            ...state,
            [chat.id]: editChat(existing, chat)
        };
    }
    return state;
}
function editChat(original, replacement) {
    if (!original) {
        return replacement;
    }
    return {
        ...replacement,
        editedTime: replacement.time,
        time: original.time
    };
}
function default_1(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Constants_1.CHAT_INCOMING:
            return addChat(state, action);
        case Constants_1.CHAT_OUTGOING:
            return addChat(state, action);
    }
    return state;
}
exports.default = default_1;

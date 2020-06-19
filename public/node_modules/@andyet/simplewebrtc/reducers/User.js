"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {
    displayName: '',
    globalVolumeLimit: 1,
    mediaEnabled: true,
    pushToTalk: false,
    requestingMedia: 'video',
    voiceActivityThreshold: -65
};
function updatePreference(state, action) {
    return {
        ...state,
        ...action.payload
    };
}
function default_1(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Constants_1.SET_USER_PREFERENCE:
            return updatePreference(state, action);
        case Constants_1.RECEIVED_CONFIG:
            return updatePreference(state, {
                payload: {
                    displayName: action.payload.config.displayName || state.displayName || 'Anonymous'
                },
                type: Constants_1.SET_USER_PREFERENCE
            });
        case Constants_1.DEVICES: {
            const outputDevice = state.audioOutputDeviceId;
            if (outputDevice) {
                for (const device of action.payload) {
                    if (device.deviceId === outputDevice) {
                        return state;
                    }
                }
                // Our output device is no longer available
                return updatePreference(state, {
                    payload: {
                        audioOutputDeviceId: ''
                    },
                    type: Constants_1.SET_USER_PREFERENCE
                });
            }
            return state;
        }
    }
    return state;
}
exports.default = default_1;

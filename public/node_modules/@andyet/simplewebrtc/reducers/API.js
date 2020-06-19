"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {
    config: {
        apiVersion: '',
        credential: '',
        customerData: {},
        iceServers: [],
        id: '',
        orgId: '',
        roomConfigUrl: '',
        screensharingExtensions: {
            chrome: ''
        },
        signalingUrl: '',
        telemetryUrl: '',
        userId: ''
    },
    configUrl: '',
    connectionAttempts: 0,
    connectionState: 'disconnected',
    queuedTelemetry: [],
    signalingClient: undefined,
    token: '',
    videoResolutionTiers: [
        [0, { width: 1280, height: 720, frameRate: 30 }],
        [1, { width: 800, height: 600, frameRate: 30 }],
        [2, { width: 640, height: 480, frameRate: 30 }],
        [3, { width: 320, height: 240, frameRate: 15 }],
        [5, { width: 320, height: 240, frameRate: 10 }]
    ]
};
function default_1(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Constants_1.SIGNALING_CLIENT:
            return {
                ...state,
                signalingClient: action.payload
            };
        case Constants_1.SIGNALING_CLIENT_SHUTDOWN:
            return {
                ...state,
                connectionState: 'disconnected',
                signalingClient: undefined
            };
        case Constants_1.CONNECTION_STATE_CHANGE:
            return {
                ...state,
                connectionState: action.payload
            };
        case Constants_1.RECEIVED_CONFIG: {
            const config = action.payload.config;
            const configUrl = action.payload.configUrl;
            const token = action.payload.token || '';
            return {
                ...state,
                config: {
                    ...state.config,
                    ...config
                },
                configUrl,
                token
            };
        }
        case Constants_1.QUEUE_TELEMETRY:
            return {
                ...state,
                queuedTelemetry: [...state.queuedTelemetry, action.payload]
            };
        case Constants_1.TELEMETRY_SUCCESS:
            return {
                ...state,
                queuedTelemetry: state.queuedTelemetry.slice(action.payload)
            };
        case Constants_1.SET_VIDEO_RESOLUTION_TIERS:
            return {
                ...state,
                videoResolutionTiers: action.payload.videoResolutionTiers
            };
    }
    return state;
}
exports.default = default_1;

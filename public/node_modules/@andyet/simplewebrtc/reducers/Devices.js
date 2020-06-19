"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const INITIAL_STATE = {
    cameraPermissionDenied: false,
    cameraPermissionGranted: false,
    devices: [],
    hasAudioOutput: false,
    hasCamera: false,
    hasMicrophone: false,
    microphonePermissionDenied: false,
    microphonePermissionGranted: false,
    requestingCameraCapture: false,
    requestingCapture: false,
    requestingMicrophoneCapture: false
};
function default_1(state = INITIAL_STATE, action) {
    if (action.type === Constants_1.DEVICES) {
        const rawDevices = action.payload;
        const prevDevices = new Map(state.devices.map(d => [d.deviceId || d.kind, d]));
        const labeledDevices = [];
        let hasMicrophone = false;
        let hasCamera = false;
        let hasAudioOutput = false;
        let cameraPermissionGranted = false;
        let microphonePermissionGranted = false;
        let sameList = rawDevices.length === prevDevices.size;
        for (const device of rawDevices) {
            if (device.kind === 'audioinput') {
                hasMicrophone = true;
                microphonePermissionGranted =
                    microphonePermissionGranted || !!(device.label && device.deviceId);
            }
            if (device.kind === 'videoinput') {
                hasCamera = true;
                cameraPermissionGranted = cameraPermissionGranted || !!(device.label && device.deviceId);
            }
            if (device.kind === 'audiooutput') {
                hasAudioOutput = true;
            }
            sameList = sameList && prevDevices.has(device.deviceId || device.kind);
            if (!!device.label) {
                labeledDevices.push(device);
            }
        }
        return {
            ...state,
            cameraPermissionGranted,
            devices: sameList ? state.devices : rawDevices.filter(d => !!d.label),
            hasAudioOutput,
            hasCamera,
            hasMicrophone,
            microphonePermissionGranted
        };
    }
    if (action.type === Constants_1.CAMERA_PERMISSION_DENIED) {
        return {
            ...state,
            cameraPermissionDenied: true
        };
    }
    if (action.type === Constants_1.MICROPHONE_PERMISSION_DENIED) {
        return {
            ...state,
            microphonePermissionDenied: true
        };
    }
    if (action.type === Constants_1.DEVICE_CAPTURE) {
        return {
            ...state,
            requestingCameraCapture: action.payload.camera,
            requestingCapture: action.payload.camera || action.payload.microphone,
            requestingMicrophoneCapture: action.payload.microphone
        };
    }
    return state;
}
exports.default = default_1;

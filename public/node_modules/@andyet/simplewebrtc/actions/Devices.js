"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
// =====================================================================
let deviceListener;
let devicePollInterval;
let pendingEnumerate;
// =====================================================================
/**
 * @description
 * Begin listening for media device changes.
 *
 * @public
 */
function listenForDevices() {
    return (dispatch, getState) => {
        if (!navigator.mediaDevices) {
            return;
        }
        if (!deviceListener) {
            deviceListener = () => {
                dispatch(fetchDevices());
            };
        }
        // Browsers will no longer emit devicechange before permissions
        // have been granted. Periodically poll for devices to detect if
        // the available categories have changed (e.g. go from no cameras
        // to some camera is available).
        //
        // Once permissions have been granted, polling will cease.
        if (!devicePollInterval) {
            devicePollInterval = setInterval(() => {
                dispatch(fetchDevices(true));
            }, 3000);
        }
        navigator.mediaDevices.addEventListener('devicechange', () => {
            stopPollingForDevices();
            if (deviceListener) {
                deviceListener();
            }
        });
        deviceListener();
    };
}
exports.listenForDevices = listenForDevices;
/**
 * @description
 * Fetch devices.
 *
 * @public
 */
function fetchDevices(polling) {
    return async (dispatch, getState) => {
        if (!navigator.mediaDevices) {
            return;
        }
        if (pendingEnumerate) {
            // We're already updating the device list, let that call handle the results.
            return;
        }
        pendingEnumerate = navigator.mediaDevices.enumerateDevices();
        const devices = await pendingEnumerate;
        pendingEnumerate = undefined;
        // Remove polling if we detect we have permissions.
        for (const device of devices) {
            if (devicePollInterval && device.deviceId) {
                stopPollingForDevices();
                break;
            }
        }
        return dispatch(deviceList(devices));
    };
}
exports.fetchDevices = fetchDevices;
/**
 * @description
 * Stop listening for media device changes.
 *
 * @public
 */
function stopListeningForDevices() {
    if (deviceListener) {
        navigator.mediaDevices.removeEventListener('devicechange', deviceListener);
        deviceListener = undefined;
    }
    stopPollingForDevices();
}
exports.stopListeningForDevices = stopListeningForDevices;
/**
 * Stop polling for device changes before permission grant.
 *
 * @private
 */
function stopPollingForDevices() {
    if (devicePollInterval) {
        clearInterval(devicePollInterval);
        devicePollInterval = undefined;
    }
}
exports.stopPollingForDevices = stopPollingForDevices;
/**
 * Device list changed.
 *
 * @private
 *
 * @param devices Device[]
 */
function deviceList(devices) {
    devices = devices.filter(d => {
        // Work around Safari reporting the built-in speakers as a microphone
        if (d.kind === 'audioinput' && d.label === 'MacBook Pro Speakers') {
            return false;
        }
        return true;
    });
    // FIX: Safari 13 is mislabeling videoinput as an audioinput before device permissions have been granted
    // This detects the presence of multiple audioinputs before permission grant (during which time there
    // should only be one listed, regardless of actual device count), and corrects one to a videoinput.
    const doubleAudioPrePermission = devices.filter(d => !d.deviceId && d.kind === 'audioinput');
    if (doubleAudioPrePermission.length >= 2) {
        const fakeVideoInput = {
            deviceId: '',
            groupId: '',
            kind: 'videoinput',
            label: '',
            toJSON: () => fakeVideoInput
        };
        return {
            payload: [doubleAudioPrePermission[0], fakeVideoInput],
            type: Constants_1.DEVICES
        };
    }
    return {
        payload: devices,
        type: Constants_1.DEVICES
    };
}
exports.deviceList = deviceList;
/**
 * Camera permission denied
 *
 * @private
 *
 * @param error Error
 */
function cameraPermissionDenied(error) {
    return {
        payload: {
            error
        },
        type: Constants_1.CAMERA_PERMISSION_DENIED
    };
}
exports.cameraPermissionDenied = cameraPermissionDenied;
/**
 * Microphone permission denied
 *
 * @private
 *
 * @param error Error
 */
function microphonePermissionDenied(error) {
    return {
        payload: {
            error
        },
        type: Constants_1.MICROPHONE_PERMISSION_DENIED
    };
}
exports.microphonePermissionDenied = microphonePermissionDenied;
/**
 * Update device capture request status.
 *
 * @private
 *
 * @param error Error
 */
function deviceCaptureRequest(camera, microphone) {
    return {
        payload: {
            camera,
            microphone
        },
        type: Constants_1.DEVICE_CAPTURE
    };
}
exports.deviceCaptureRequest = deviceCaptureRequest;

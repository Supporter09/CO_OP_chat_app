import { ThunkAction } from 'redux-thunk';
import { CAMERA_PERMISSION_DENIED, DEVICE_CAPTURE, DEVICES, MICROPHONE_PERMISSION_DENIED } from '../Constants';
import { State } from '../reducers';
export interface Devices {
    payload: MediaDeviceInfo[];
    type: typeof DEVICES;
}
export interface DevicePermissionDenied {
    payload: {
        error?: Error;
    };
    type: typeof CAMERA_PERMISSION_DENIED | typeof MICROPHONE_PERMISSION_DENIED;
}
export interface DeviceCapture {
    payload: {
        camera: boolean;
        microphone: boolean;
    };
    type: typeof DEVICE_CAPTURE;
}
export declare type Actions = Devices;
/**
 * @description
 * Begin listening for media device changes.
 *
 * @public
 */
export declare function listenForDevices(): ThunkAction<void, State, void, Devices>;
/**
 * @description
 * Fetch devices.
 *
 * @public
 */
export declare function fetchDevices(polling?: boolean): ThunkAction<void, State, void, Devices>;
/**
 * @description
 * Stop listening for media device changes.
 *
 * @public
 */
export declare function stopListeningForDevices(): void;
/**
 * Stop polling for device changes before permission grant.
 *
 * @private
 */
export declare function stopPollingForDevices(): void;
/**
 * Device list changed.
 *
 * @private
 *
 * @param devices Device[]
 */
export declare function deviceList(devices: MediaDeviceInfo[]): Devices;
/**
 * Camera permission denied
 *
 * @private
 *
 * @param error Error
 */
export declare function cameraPermissionDenied(error?: Error): DevicePermissionDenied;
/**
 * Microphone permission denied
 *
 * @private
 *
 * @param error Error
 */
export declare function microphonePermissionDenied(error?: Error): DevicePermissionDenied;
/**
 * Update device capture request status.
 *
 * @private
 *
 * @param error Error
 */
export declare function deviceCaptureRequest(camera: boolean, microphone: boolean): DeviceCapture;

import { DeviceCapture, DevicePermissionDenied, Devices } from '../actions';
import { DevicePermissions } from '../Definitions';
export interface DeviceState extends DevicePermissions {
    devices: MediaDeviceInfo[];
}
export default function (state: DeviceState | undefined, action: Devices | DeviceCapture | DevicePermissionDenied): DeviceState;

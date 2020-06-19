import * as React from 'react';
export interface DeviceListProps {
    audioInput?: boolean;
    audioOutput?: boolean;
    cameraPermissionDenied?: boolean;
    cameraPermissionGranted?: boolean;
    devices?: MediaDeviceInfo[];
    hasAudioOutput?: boolean;
    hasCamera?: boolean;
    hasMicrophone?: boolean;
    microphonePermissionDenied?: boolean;
    microphonePermissionGranted?: boolean;
    requestingCameraCapture?: boolean;
    requestingCapture?: boolean;
    requestingMicrophoneCapture?: boolean;
    videoInput?: boolean;
    fetchDevices?: () => void;
    listenForDevices?: () => void;
    render?: (props: DeviceListRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: DeviceListRenderProps) => React.ReactNode);
}
export interface DeviceListRenderProps {
    audioInput: boolean;
    audioOutput: boolean;
    cameraPermissionDenied: boolean;
    cameraPermissionGranted: boolean;
    devices: MediaDeviceInfo[];
    hasAudioOutput: boolean;
    hasCamera: boolean;
    hasMicrophone: boolean;
    microphonePermissionDenied: boolean;
    microphonePermissionGranted: boolean;
    requestingCameraCapture?: boolean;
    requestingCapture?: boolean;
    requestingMicrophoneCapture?: boolean;
    videoInput: boolean;
}
/**
 * @description
 *
 * @public
 *
 */
declare class DeviceList extends React.Component<DeviceListProps, any> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof DeviceList, Pick<React.ClassAttributes<DeviceList> & DeviceListProps, "key" | "ref"> & DeviceListProps>;
export default _default;

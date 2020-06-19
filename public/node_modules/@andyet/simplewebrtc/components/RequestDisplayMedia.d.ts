import * as React from 'react';
export interface RequestDisplayMediaProps {
    share?: boolean;
    extensionId?: string;
    audio?: boolean;
    audioTypeHint?: undefined | 'speech' | 'music';
    videoTypeHint?: undefined | 'motion' | 'detail' | 'text';
    addLocalAudio?: (track: MediaStreamTrack, stream: MediaStream) => void;
    addLocalScreen?: (track: MediaStreamTrack, stream: MediaStream) => void;
    shareLocalMedia?: (id: string) => void;
    render?: (getDisplayMedia: () => void, extension: RequestDisplayMediaExtensionProps) => React.ReactNode;
}
export interface RequestDisplayMediaExtensionProps {
    available: boolean;
    extensionId?: string;
    extensionRequired: boolean;
    extensionInstalled: boolean;
    extensionInstalling?: boolean;
    listenForInstallation?: (interval?: number) => void;
    ready: boolean;
}
export interface RequestDisplayMediaState {
    extensionRequired: boolean;
    extensionInstalled: boolean;
    extensionInstalling?: boolean;
}
/**
 * @description
 *
 * @public
 *
 */
export declare class RequestDisplayMedia extends React.Component<RequestDisplayMediaProps, RequestDisplayMediaState> {
    constructor(props: RequestDisplayMediaProps);
    getDisplayMedia(): Promise<void>;
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof RequestDisplayMedia, Pick<React.ClassAttributes<RequestDisplayMedia> & RequestDisplayMediaProps, "key" | "ref"> & RequestDisplayMediaProps>;
export default _default;

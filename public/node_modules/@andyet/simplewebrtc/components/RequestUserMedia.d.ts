import * as React from 'react';
/**
 * @param audio If `true`, request audio. An object of media constraints may be used instead.
 * @param video If `true`, request video. An object of media constraints may be used instead.
 * @param auto If `true`, request media immediately when rendered.
 * @param share If `true`, requested media will be immediately marked as shareable with peers.
 * @param audioTypeHint Hint to the browser on how to treat the audio source. Options are "speech" or "music".
 * @param videoTypeHint Hint to the browser on how to treat the video source. Options are "motion", "detail", "text".
 * @param audioProcessing If explicitly set to `false`, disable the default echo cancellation, gain control, and noise suppression processing.
 */
export interface RequestUserMediaProps {
    audio?: boolean | MediaTrackConstraints;
    video?: boolean | MediaTrackConstraints;
    audioTypeHint?: undefined | 'speech' | 'music';
    videoTypeHint?: undefined | 'motion' | 'detail' | 'text';
    audioProcessing?: boolean;
    auto?: boolean;
    share?: boolean;
    mirrored?: boolean;
    screenCapture?: boolean;
    replaceAudio?: string;
    replaceVideo?: string;
    requestingCapture?: boolean;
    requestingCameraCapture?: boolean;
    requestingMicrophoneCapture?: boolean;
    addLocalAudio?: (track: MediaStreamTrack, stream: MediaStream, replace?: string) => void;
    addLocalVideo?: (track: MediaStreamTrack, stream: MediaStream, mirrored?: boolean, replace?: string) => void;
    addLocalScreen?: (track: MediaStreamTrack, stream: MediaStream, replace?: string) => void;
    removeAllMedia?: (kind: 'audio' | 'video') => void;
    shareLocalMedia?: (id: string) => void;
    deviceCaptureRequest?: (camera: boolean, microphone: boolean) => void;
    fetchDevices?: () => void;
    cameraPermissionDenied?: (err?: Error) => void;
    microphonePermissionDenied?: (err?: Error) => void;
    onSuccess?: (trackIds?: UserMediaIds) => void;
    onError?: (err?: Error) => void;
    render?: (getMedia: (additional?: MediaStreamConstraints) => Promise<UserMediaIds>, captureState: {
        requestingCapture?: boolean;
        requestingCameraCapture?: boolean;
        requestingMicrophoneCapture?: boolean;
    }) => React.ReactNode;
}
export interface UserMediaIds {
    audio?: string;
    video?: string;
}
/**
 * @description
 * The `<RequestUserMedia />` component can be used to request user audio and video media.
 *
 * @public
 *
 * @example
 * <div>
 *   {/* Request audio and immediately share *\/}
 *   <RequestUserMedia audio auto share />
 *   {/* Request audio and video, but use custom renderer to trigger it *\/}
 *   <RequestUserMedia audio video share
 *    render={({ getUserMedia }) => (
 *    <button onClick={getUserMedia}>Get Media</button>
 *   )} />
 * </div>
 */
export declare class RequestUserMedia extends React.Component<RequestUserMediaProps> {
    private errorCount;
    constructor(props: RequestUserMediaProps);
    getMedia(additional?: MediaStreamConstraints): Promise<UserMediaIds>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: RequestUserMediaProps): void;
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof RequestUserMedia, Pick<React.ClassAttributes<RequestUserMedia> & RequestUserMediaProps, "key" | "ref"> & RequestUserMediaProps>;
export default _default;

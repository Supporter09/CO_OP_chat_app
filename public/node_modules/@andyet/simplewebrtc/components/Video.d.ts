import * as React from 'react';
import { Media } from '../Definitions';
/**
 * @param media Media object wrapper, see `Media` interface below.
 * @param qualityProfile Request a higher or lower quality video stream from the peer to match UI needs
 */
export interface VideoProps {
    media: Media;
    qualityProfile?: 'high' | 'medium' | 'low';
    requestQualityProfile?: (profile: 'high' | 'medium' | 'low') => void;
}
/**
 * @description
 * Local and remote video tracks can be played with the `<Video/>` component.
 *
 * The provided `media` property can include `remoteDisabled` and `localDisabled` fields. If either of those properties are `true`, video playback will be paused.
 *
 * The `qualityProfile` property can be used to request increasing or decreasing the video size/quality from the sending peer, if the media is from a remote source.
 *
 * Only one `Video` component with a `qualityProfile` should be rendered at a time for a given video track.
 *
 * @public
 *
 * @example
 * <Video media={getMediaTrack(store, 'some-media-id')} />
 */
declare class Video extends React.Component<VideoProps, any> {
    private video;
    componentDidMount(): void;
    componentDidUpdate(prev: VideoProps): void;
    componentWillUnmount(): void;
    setup(prev?: VideoProps): void;
    render(): JSX.Element | null;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Video, Pick<React.ClassAttributes<Video> & VideoProps, "key" | "ref"> & VideoProps>;
export default _default;

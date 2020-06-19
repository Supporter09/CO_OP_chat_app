import * as React from 'react';
import { Media } from '../Definitions';
/**
 * @param media Media object wrapper, see `Media` interface below.
 * @param volume Output volume limit, from `0` to `1` inclusive.
 * @param outputDevice Device ID of the specific speaker to use. (Depends on browser support).
 */
export interface AudioProps {
    media: Media;
    volume?: number;
    outputDevice?: string;
}
/**
 * @description
 * Local and remote audio tracks can be played with the `<Audio/>` component.
 *
 * The provided `media` property can include `remoteDisabled` and `localDisabled` fields. If either of those properties are `true`, audio playback will be muted.
 *
 * @public
 *
 * @example
 * <Audio
 *  media={getMediaTrack(store, 'some-media-id')}
 *  volume={getGlobalVolumeLimit(store)}
 *  outputDevice={getAudioOutputDevice(store)}
 * />
 */
declare class Audio extends React.Component<AudioProps, any> {
    private audio;
    private stream?;
    componentDidMount(): void;
    componentDidUpdate(prev: AudioProps): void;
    setup(newStream: boolean): void;
    render(): JSX.Element;
}
export default Audio;

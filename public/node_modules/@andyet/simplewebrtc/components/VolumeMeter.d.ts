import * as React from 'react';
import { Media } from '../Definitions';
/**
 * @param media object wrapper, see `Media` interface below.
 * @param render Properties provided for use with a custom render function. These include the output volume and whether speech has been detected.
 */
export interface VolumeMeterProps {
    media: Media;
    noInputTimeout?: number;
    render: (props: VolumeMeterRenderProps) => React.ReactNode;
}
export interface VolumeMeterState {
    volume: number;
}
export interface VolumeMeterRenderProps {
    media: Media;
    muted: boolean;
    noInput: boolean;
    volume: number;
    speaking: boolean;
    speakingWhileMuted: boolean;
    loaded: boolean;
}
/**
 * @description
 * The volume meter component can be used to display the audio output volume of a track. Useful for showing that a user's microphone is live and sensitive enough to detect speech.
 *
 * @public
 *
 * @example
 * <VolumeMeter
 * media={getMediaTrack(store, 'some-media-id')}
 * render={({ volume, speaking }) => {
 *   // Render volume as a series of segments
 *
 *   const buckets = Math.abs(Math.max(volume / 10));
 *   let i = 0;
 *
 *   const segments = [];
 *   for (let i = 0; i < buckets; i++) {
 *       segments.push(<div key={i} className='volume-meter-segment' />);
 *   }
 *
 *   return (
 *     <div className={speaking ? 'volume-meter-speaking' : 'volume-meter-notspeaking'}>
 *       {segments}
 *     </div>
 *   );
 * }} />
 */
declare class VolumeMeter extends React.Component<VolumeMeterProps, VolumeMeterState> {
    state: VolumeMeterState;
    private hark?;
    private onVolume;
    constructor(props: VolumeMeterProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: VolumeMeterProps): void;
    attachHark(): void;
    detachHark(): void;
    render(): React.ReactNode;
}
export default VolumeMeter;

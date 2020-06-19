import * as React from 'react';
import { Peer } from '../Definitions';
export interface PeerControlsProps {
    peer: Peer;
    isMuted?: boolean;
    isSpeaking?: boolean;
    hasActiveMicrophone?: boolean;
    mute?: () => void;
    unmute?: () => void;
    kick?: () => void;
    setVolumeLimit?: (volume: number) => void;
    render?: (props: PeerControlsRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: PeerControlsRenderProps) => React.ReactNode);
}
export interface PeerControlsRenderProps {
    peer: Peer;
    isMuted: boolean;
    isSpeaking: boolean;
    hasActiveMicrophone: boolean;
    mute: () => void;
    unmute: () => void;
    kick: () => void;
    setVolumeLimit: (volume: number) => void;
}
/**
 * @description
 *
 * @public
 *
 */
export declare class PeerControls extends React.Component<PeerControlsProps, any> {
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof PeerControls, Pick<React.ClassAttributes<PeerControls> & PeerControlsProps, "key" | "ref"> & PeerControlsProps>;
export default _default;

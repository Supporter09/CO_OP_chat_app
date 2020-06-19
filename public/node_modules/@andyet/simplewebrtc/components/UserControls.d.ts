import * as React from 'react';
import * as Actions from '../actions';
import { User } from '../Definitions';
export interface UserControlsProps {
    user?: User;
    customerData?: object;
    hasAudio?: boolean;
    hasVideo?: boolean;
    hasScreenCapture?: boolean;
    isDeafened?: boolean;
    isMuted?: boolean;
    isPaused?: boolean;
    isScreenCapturePaused?: boolean;
    isSpeaking?: boolean;
    isSpeakingWhileMuted?: boolean;
    deafen?: () => void;
    undeafen?: () => void;
    mute?: () => void;
    unmute?: () => void;
    pauseVideo?: (opts?: Actions.SelfVideoOptions) => void;
    resumeVideo?: (opts?: Actions.SelfVideoOptions) => void;
    setDisplayName?: (name: string) => void;
    setAudioOutputDevice?: (deviceId: string) => void;
    setVoiceActivityThreshold?: (threshold: number) => void;
    setGlobalVolumeLimit?: (volumeLimit: number) => void;
    render?: (props: UserControlsRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: UserControlsRenderProps) => React.ReactNode);
}
export interface UserControlsRenderProps {
    user: User;
    customerData: object;
    hasAudio: boolean;
    hasVideo: boolean;
    hasScreenCapture: boolean;
    isDeafened: boolean;
    isMuted: boolean;
    isPaused: boolean;
    isScreenCapturePaused?: boolean;
    isSpeaking: boolean;
    isSpeakingWhileMuted: boolean;
    deafen: () => void;
    undeafen: () => void;
    mute: () => void;
    unmute: () => void;
    pauseVideo: (opts?: Actions.SelfVideoOptions) => void;
    resumeVideo: (opts?: Actions.SelfVideoOptions) => void;
    setAudioOutputDevice: (deviceId: string) => void;
    setDisplayName: (name: string) => void;
    setVoiceActivityThreshold: (threshold: number) => void;
    setGlobalVolumeLimit: (volumeLimit: number) => void;
}
/**
 * @description
 *
 * @public
 *
 */
export declare class UserControls extends React.Component<UserControlsProps, any> {
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof UserControls, Pick<React.ClassAttributes<UserControls> & UserControlsProps, "key" | "ref"> & UserControlsProps>;
export default _default;

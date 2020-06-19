import * as React from 'react';
import { Media } from '../Definitions';
export interface MediaControlsProps {
    media: Media;
    autoRemove?: boolean;
    enableMedia?: () => void;
    disableMedia?: () => void;
    removeLocalMedia?: () => void;
    shareLocalMedia?: () => void;
    stopSharingLocalMedia?: () => void;
    render?: (props: MediaControlsRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: MediaControlsRenderProps) => React.ReactNode);
}
export interface MediaControlsRenderProps {
    media: Media;
    enable: () => void;
    disable: () => void;
    isEnabled: boolean;
    isShared: boolean;
    remove: () => void;
    share: () => void;
    stopSharing: () => void;
}
/**
 * @description
 *
 * @public
 *
 */
export declare class MediaControls extends React.Component<MediaControlsProps, any> {
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof MediaControls, Pick<React.ClassAttributes<MediaControls> & MediaControlsProps, "key" | "ref"> & MediaControlsProps>;
export default _default;

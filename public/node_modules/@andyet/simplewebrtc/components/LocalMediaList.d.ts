import * as React from 'react';
import { Media } from '../Definitions';
export interface LocalMediaListProps {
    remote?: boolean;
    local?: boolean;
    audio?: boolean;
    video?: boolean;
    screen?: boolean;
    shared?: boolean;
    media?: Media[];
    removeMedia?: (id: string) => void;
    shareLocalMedia?: (id: string) => void;
    stopSharingLocalMedia?: (id: string) => void;
    render?: (props: LocalMediaListRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: LocalMediaListRenderProps) => React.ReactNode);
}
export interface LocalMediaListRenderProps {
    media: Media[];
    remote?: boolean;
    local?: boolean;
    audio?: boolean;
    video?: boolean;
    shared?: boolean;
    screen?: boolean;
    removeMedia: (id: string) => void;
    shareLocalMedia: (id: string) => void;
    stopSharingLocalMedia: (id: string) => void;
}
/**
 * @description
 *
 * @public
 *
 */
declare class LocalMediaList extends React.Component<LocalMediaListProps, any> {
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof LocalMediaList, Pick<React.ClassAttributes<LocalMediaList> & LocalMediaListProps, "key" | "ref"> & LocalMediaListProps>;
export default _default;

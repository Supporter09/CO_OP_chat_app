import * as React from 'react';
import { Media } from '../Definitions';
export interface RemoteMediaListProps {
    audio?: boolean;
    video?: boolean;
    peer?: string;
    media?: Media[];
    render?: (props: RemoteMediaListRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: RemoteMediaListRenderProps) => React.ReactNode);
}
export interface RemoteMediaListRenderProps {
    media: Media[];
    audio?: boolean;
    video?: boolean;
    peer?: string;
}
/**
 * @description
 *
 * @public
 *
 */
declare class RemoteMediaList extends React.Component<RemoteMediaListProps, any> {
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof RemoteMediaList, Pick<React.ClassAttributes<RemoteMediaList> & RemoteMediaListProps, "key" | "ref"> & RemoteMediaListProps>;
export default _default;

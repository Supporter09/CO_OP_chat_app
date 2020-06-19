import * as React from 'react';
import { Peer } from '../Definitions';
export interface PeerListProps {
    room: string;
    joinedCall?: boolean;
    speaking?: boolean;
    chatState?: 'active' | 'composing' | 'paused';
    requestingAttention?: boolean;
    peers?: Peer[];
    render?: (props: PeerListRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: PeerListRenderProps) => React.ReactNode);
}
export interface PeerListRenderProps {
    peers: Peer[];
    chatState?: 'active' | 'composing' | 'paused';
    joinedCall: boolean;
    speaking: boolean;
}
/**
 * @description
 *
 * @public
 *
 */
declare class PeerList extends React.Component<PeerListProps, any> {
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof PeerList, Pick<React.ClassAttributes<PeerList> & PeerListProps, "key" | "ref"> & PeerListProps>;
export default _default;

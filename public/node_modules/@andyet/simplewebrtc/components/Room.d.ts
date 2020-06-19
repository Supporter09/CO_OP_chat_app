import * as React from 'react';
import { Call, Media, Peer, Room as RoomState } from '../Definitions';
interface RoomDispatchProps {
    join?: () => void;
    destroy?: (roomAddress: string) => void;
    leave?: (roomAddress: string) => void;
    lock?: (roomAddress: string, password: string) => void;
    unlock?: (roomAddress: string) => void;
}
interface RoomStateProps {
    connectionState?: string;
    roomState?: string;
    roomAddress?: string;
    room?: RoomState;
    call?: Call;
    peers?: Peer[];
    localMedia?: Media[];
    remoteMedia?: Media[];
}
interface RoomRenderProps {
    call: Partial<Call>;
    joined?: boolean;
    localMedia: Media[];
    peers: Peer[];
    remoteMedia: Media[];
    room: Partial<RoomState>;
    roomState?: RoomState['roomState'];
}
export interface RoomProps extends RoomStateProps, RoomDispatchProps {
    name: string;
    password?: string;
    render?: (props: RoomRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: RoomRenderProps) => React.ReactNode);
}
/**
 * @description
 *
 * @public
 *
 */
declare class Room extends React.Component<RoomProps, any> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: RoomProps): void;
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Room, Pick<React.ClassAttributes<Room> & RoomProps, "password" | "key" | "ref" | "children" | "render" | "name"> & RoomProps>;
export default _default;

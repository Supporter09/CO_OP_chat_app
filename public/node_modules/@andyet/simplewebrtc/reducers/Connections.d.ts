import { AddConnection, RemoveConnection, UpdateConnection } from '../actions';
import { PeerConnection } from '../Definitions';
export interface PeerConnectionState {
    [key: string]: PeerConnection;
}
export default function (state: PeerConnectionState | undefined, action: AddConnection | RemoveConnection | UpdateConnection): PeerConnectionState;

import { ConnectionStateChange, LeaveRoom, PeerOffline, PeerOnline, PeerUpdated } from '../actions';
import { Peer } from '../Definitions';
export interface PeerState {
    [key: string]: Peer;
}
export default function (state: PeerState | undefined, action: ConnectionStateChange | PeerOnline | PeerOffline | PeerUpdated | LeaveRoom): PeerState;

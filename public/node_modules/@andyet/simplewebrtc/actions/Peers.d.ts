import { ThunkAction } from 'redux-thunk';
import { KICK_PEER, PEER_OFFLINE, PEER_ONLINE, PEER_UPDATED } from '../Constants';
import { State } from '../reducers';
export interface PeerOnline {
    payload: {
        roomAddress: string;
        peerAddress: string;
        userAddress?: string;
        affiliation: string;
        role: string;
        id: string;
        joinedCall: boolean;
        displayName: string;
        customerData: any;
        requestingMedia: 'video' | 'audio' | 'none';
    };
    type: typeof PEER_ONLINE;
}
export interface PeerOffline {
    payload: {
        roomAddress: string;
        peerAddress: string;
    };
    type: typeof PEER_OFFLINE;
}
export interface PeerUpdated {
    payload: {
        peerAddress: string;
        updated: Partial<PeerUpdatedOptions>;
    };
    type: typeof PEER_UPDATED;
}
export interface KickPeer {
    payload: {
        roomAddress: string;
        peerAddress: string;
    };
    type: typeof KICK_PEER;
}
export declare type Actions = PeerOnline | PeerOffline | PeerUpdated | KickPeer;
/**
 * Add a new peer for a room.
 *
 * @private
 *
 * @param roomAddress string
 * @param peerAddress string
 */
export declare function peerOnline(roomAddress: string, peerAddress: string, opts: PeerOnlineOptions): ThunkAction<void, State, void, PeerOnline>;
export interface PeerOnlineOptions {
    id: string;
    joinedCall: boolean | undefined;
    role: string;
    affiliation: string;
    displayName: string;
    customerData: any;
    requestingMedia: 'video' | 'audio' | 'none' | undefined;
    userAddress?: string;
}
/**
 * Mark a peer as offline.
 *
 * @private
 *
 * @param roomAddress string
 * @param peerAddress string
 */
export declare function peerOffline(roomAddress: string, peerAddress: string): ThunkAction<void, State, void, PeerOffline>;
/**
 * Update a peer's information.
 *
 * @private
 *
 * @param peerAddress string
 * @param updated.chatState 'active' | 'composing' | 'paused'
 * @param updated.displayName string
 * @param updated.speaking boolean
 * @param updated.requestingAttention boolean
 * @param updated.rtt string
 * @param updated.customerData object
 * @param updated.volumeLimit number
 * @param updated.joinedCall boolean
 * @param updated.requestingMedia 'video' | 'audio' | 'none'
 * @param updated.sessionFailed boolean
 */
export declare function peerUpdated(peerAddress: string, updated: Partial<PeerUpdatedOptions>): ThunkAction<void, State, void, PeerUpdated>;
export interface PeerUpdatedOptions {
    chatState: 'active' | 'composing' | 'paused' | 'inactive' | 'gone';
    displayName: string;
    speaking: boolean;
    requestingAttention: boolean;
    rtt: string;
    customerData: object;
    volumeLimit: number;
    joinedCall: boolean;
    requestingMedia: 'video' | 'audio' | 'none';
    muted: boolean;
    sessionFailed: boolean;
}
/**
 * @description
 * Kick a peer from the room.
 *
 * Only takes effect if the kicker is a room moderator.
 *
 * @public
 *
 * @param roomAddress The address of the room
 * @param peerAddress The address of the peer to remove from the room
 */
export declare function kickPeer(roomAddress: string, peerAddress: string): ThunkAction<void, State, void, KickPeer>;
/**
 * @description
 * Set the overall volume limit for a peer.
 *
 * The volume limit must be between 0 and 1.
 *
 * @public
 *
 * @param peerAddress The address of the peer to adjust
 * @param volumeLimit The new volume limit, from 0 to 1 inclusive
 */
export declare function limitPeerVolume(peerAddress: string, volumeLimit: number): PeerUpdated;

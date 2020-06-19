import { PEER_CONNECTION_ADDED, PEER_CONNECTION_REMOVED, PEER_CONNECTION_UPDATED } from '../Constants';
import { PeerConnection } from '../Definitions';
export interface UpdateConnection {
    payload: {
        id: string;
        peerAddress: string;
        updated: Partial<PeerConnection>;
    };
    type: typeof PEER_CONNECTION_UPDATED;
}
export interface AddConnection {
    payload: {
        id: string;
        peerAddress: string;
        roomAddress: string;
    };
    type: typeof PEER_CONNECTION_ADDED;
}
export interface RemoveConnection {
    payload: {
        id: string;
        peerAddress: string;
    };
    type: typeof PEER_CONNECTION_REMOVED;
}
export declare type Actions = UpdateConnection | AddConnection | RemoveConnection;
/**
 * Start tracking a peer connection.
 *
 * @private
 *
 * @param peerAddress string
 * @param sessionId string
 */
export declare function addConnection(peerAddress: string, sessionId: string): AddConnection;
/**
 * Stop tracking a peer connection.
 *
 * @private
 *
 * @param peerAddress string
 * @param sessionId string
 */
export declare function removeConnection(peerAddress: string, sessionId: string): RemoveConnection;
/**
 * Update the state of a peer connection.
 *
 * @private
 *
 * @param peerAddress string
 * @param sessionId string
 * @param updated.connectionState string
 * @param updated.receivingAudioMediaId string
 * @param updated.receivingVideoMediaId string
 * @param updated.sendingAudioMediaId string
 * @param updated.sendingVideoMediaId string
 */
export declare function updateConnection(peerAddress: string, sessionId: string, updated: Partial<PeerConnection>): UpdateConnection;

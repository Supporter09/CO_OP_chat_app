import { TelemetryEvent } from './actions';
import { APIConfig, Call, Chat, ChatGroup, DevicePermissions, Media, Peer, PeerConnection, Room, User, VideoResolutionTier } from './Definitions';
import { State } from './reducers';
import { PeerConnectionState } from './reducers/Connections';
import { SignalingClient } from './signaling';
/**
 * @description
 *
 * @public
 *
 */
export declare function getAPIConfig(state: State): APIConfig;
/**
 * @description
 *
 * @public
 *
 */
export declare function getUserToken(state: State): string;
/**
 * @description
 *
 * @public
 *
 */
export declare function getUser(state: State): User;
/**
 * @description
 *
 * @public
 *
 */
export declare function getUserCustomerData(state: State): object;
/**
 * @description
 *
 * @public
 *
 */
export declare function getConfigURL(state: State): string;
/**
 * @description
 *
 * @public
 *
 */
export declare function getClient(state: State): SignalingClient;
/**
 * @description
 *
 * @public
 *
 */
export declare function getQueuedTelemetry(state: State): TelemetryEvent[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getConnectionState(state: State): string;
/**
 * @description
 *
 * @public
 *
 */
export declare function getUserDisplayName(state: State): string;
/**
 * @description
 *
 * @public
 *
 */
export declare function getUserDataForRoom(state: State, roomAddress: string): Peer;
/**
 * @description
 *
 * @public
 *
 */
export declare function getDesiredMediaTypes(state: State, roomAddress?: string): 'audio' | 'video' | 'none';
/**
 * @description
 *
 * @public
 *
 */
export declare function getPushToTalkEnabled(state: State): boolean;
/**
 * @description
 *
 * @public
 *
 */
export declare function getPeerByAddress(state: State, peerAddress: string): Peer | undefined;
/**
 * @description
 *
 * @public
 *
 */
export declare function getRooms(state: State): {
    [key: string]: Room;
};
/**
 * @description
 *
 * @public
 *
 */
export declare function getRoomByAddress(state: State, roomAddress: string): Room | undefined;
/**
 * @description
 *
 * @public
 *
 */
export declare function getRoomByProvidedName(state: State, roomName: string): Room | undefined;
/**
 * @description
 *
 * @public
 *
 */
export declare function getPeersForRoom(state: State, roomAddress: string): Peer[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getChatsForRoom(state: State, roomAddress: string): Chat[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getGroupedChatsForRoom(state: State, roomAddress: string, maxDuration?: number): ChatGroup[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getLastSentChat(state: State, roomAddress: string): Chat;
/**
 * @description
 *
 * @public
 *
 */
export declare function getChatComposers(state: State, roomAddress: string): Peer[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getCallForRoom(state: State, roomAddress: string): Call | undefined;
/**
 * @description
 *
 * @public
 *
 */
export declare function getMedia(state: State): {
    [key: string]: Media;
};
/**
 * @description
 *
 * @public
 *
 */
export declare function getMediaTrack(state: State, id: string): Media | undefined;
/**
 * @description
 *
 * @public
 *
 */
export declare function getDeviceForMediaTrack(state: State, id: string): MediaDeviceInfo | undefined;
/**
 * @description
 *
 * @public
 *
 */
export declare function getDevices(state: State, kind?: MediaDeviceKind): MediaDeviceInfo[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getDevicePermissions(state: State): DevicePermissions;
/**
 * @description
 *
 * @public
 *
 */
export declare function getMediaForPeer(state: State, peerAddress: string, kind?: 'audio' | 'video'): Media[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getLocalMedia(state: State, kind?: 'audio' | 'video'): Media[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getRemoteMedia(state: State, kind?: 'audio' | 'video'): Media[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getSharedMedia(state: State, kind?: 'audio' | 'video'): Media[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getAudioOutputDevice(state: State): string | undefined;
/**
 * @description
 *
 * @public
 *
 */
export declare function getGlobalVolumeLimit(state: State): number;
/**
 * @description
 *
 * @public
 *
 */
export declare function getJoinedCalls(state: State): Call[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getPeersForCall(state: State, roomAddress: string): Peer[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getActiveSpeakersForCall(state: State, roomAddress: string): Peer[];
/**
 * @description
 *
 * @public
 *
 */
export declare function getConnections(state: State): PeerConnectionState;
/**
 * @description
 *
 * @public
 *
 */
export declare function getConnectionsForPeer(state: State, peerAddress: string): PeerConnection[];
/**
 * @description
 *
 * @public
 *
 */
export declare function countPeersWantingAudio(state: State): number;
/**
 * @description
 *
 * @public
 *
 */
export declare function countPeersWantingVideo(state: State): number;
/**
 * @description
 *
 * @public
 */
export declare function isSupportedBrowser(state?: State): boolean;
/**
 * @description
 *
 * @private
 */
export declare function userIsSpeaking(state: State, sharedAudioOnly?: boolean): boolean;
/**
 * @description
 *
 * @private
 */
export declare function userIsSpeakingWhileMuted(state: State, sharedAudioOnly?: boolean): boolean;
/**
 * @description
 *
 * @private
 */
export declare function getVideoResolutionTiers(state: State): VideoResolutionTier[];

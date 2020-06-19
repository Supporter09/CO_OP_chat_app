import Hark from './lib/Hark';
export interface ICEServer {
    readonly host: string;
    readonly port: number;
    readonly type: string;
    readonly transport?: string;
    readonly username?: string;
    readonly password?: string;
}
export interface APIConfig {
    readonly apiVersion: string;
    readonly userId: string;
    readonly id: string;
    readonly customerData: object;
    readonly credential: string;
    readonly roomConfigUrl: string;
    readonly signalingUrl: string;
    readonly telemetryUrl: string;
    readonly orgId: string;
    readonly iceServers: ICEServer[];
    readonly displayName?: string;
    readonly screensharingExtensions: {
        readonly chrome: string;
    };
    readonly sfuServer?: {
        readonly url: string;
        readonly minimumPeers: number;
        readonly password: string;
    };
}
export interface RoomConfig {
    readonly roomAddress: string;
}
export interface User {
    readonly displayName: string;
    readonly mediaEnabled: boolean;
    readonly requestingMedia: 'none' | 'audio' | 'video';
    readonly pushToTalk: boolean;
    readonly voiceActivityThreshold: number;
    readonly audioOutputDeviceId?: string;
    readonly globalVolumeLimit: number;
}
export interface Room {
    readonly id: string;
    readonly address: string;
    readonly autoJoinCall: boolean;
    readonly banned: boolean;
    readonly passwordRequired: boolean;
    readonly password: string;
    readonly unreadCount: number;
    readonly joined: boolean;
    readonly joinedAt?: Date;
    readonly providedName: string;
    readonly providedPassword?: string;
    readonly roomNotStarted: boolean;
    readonly selfAddress: string;
    readonly selfAffiliation: string;
    readonly selfRole: string;
    readonly roomState: 'joining' | 'joined' | 'password-required' | 'waiting' | 'banned' | 'failed' | 'ended' | 'interrupted';
}
export interface Call {
    readonly roomAddress: string;
    readonly state: 'offline' | 'starting' | 'active' | 'hold';
    readonly recordable: boolean;
    readonly recordingState: 'offline' | 'starting' | 'active';
    readonly allowedMedia: 'video' | 'audio' | 'none';
    readonly allowedVideoRoles: string[];
    readonly allowedAudioRoles: string[];
    readonly joined: boolean;
    readonly joinedAt?: Date;
    readonly requestingMedia: 'video' | 'audio' | 'none' | undefined;
}
export interface Peer {
    readonly id: string;
    readonly roomAddress: string;
    readonly userAddress?: string;
    readonly address: string;
    readonly displayName: string;
    readonly affiliation: string;
    readonly role: string;
    readonly requestingAttention: boolean;
    readonly chatState?: 'active' | 'composing' | 'paused' | 'inactive' | 'gone';
    readonly rtt: string;
    readonly customerData: object;
    readonly joinedCall: boolean;
    readonly joinedCallAt?: Date;
    readonly joinedRoomAt?: Date;
    readonly speaking: boolean;
    readonly lastSpokeAt?: Date;
    readonly volume: number;
    readonly volumeLimit: number;
    readonly requestingMedia: 'video' | 'audio' | 'none';
    readonly muted: boolean;
    readonly sessionFailed?: boolean;
}
export interface Chat {
    readonly direction: 'incoming' | 'outgoing';
    readonly id: string;
    readonly roomAddress: string;
    readonly senderAddress?: string;
    readonly body: string;
    readonly displayName: string;
    readonly time: Date;
    readonly acked: boolean;
    readonly editedTime?: Date;
}
export interface ChatGroup {
    readonly senderAddress: string;
    readonly direction: 'incoming' | 'outgoing';
    readonly displayName: string;
    readonly chats: Chat[];
    readonly peer?: Peer;
    readonly startTime?: Date;
    endTime?: Date;
}
export interface PeerConnection {
    readonly id: string;
    readonly roomAddress: string;
    readonly peerAddress: string;
    readonly connectionState: string;
    readonly sessionState: string;
    readonly restarting: boolean;
    readonly sendingAudioMediaId: string;
    readonly sendingVideoMediaId: string;
    readonly receivingAudioMediaId: string;
    readonly receivingVideoMediaId: string;
}
export interface Media {
    readonly hark?: Hark;
    readonly id: string;
    readonly source: 'local' | 'remote';
    readonly kind: 'audio' | 'video';
    readonly track: MediaStreamTrack;
    readonly stream: MediaStream;
    readonly localDisabled: boolean;
    readonly owner?: string;
    readonly roomAddress?: string;
    readonly remoteDisabled: boolean;
    readonly renderMirrored: boolean;
    readonly screenCapture: boolean;
    readonly speaking: boolean;
    readonly lastSpokeAt?: Date;
    readonly utilityStream?: MediaStream;
    readonly volume: number;
    readonly shared?: boolean;
    readonly loaded?: boolean;
    readonly height?: number;
    readonly width?: number;
    readonly replaces?: string;
    readonly inputLost?: number;
    readonly inputDetected?: boolean;
    readonly createdAt: number;
    readonly externalDisabled?: boolean;
    readonly profile?: 'low' | 'medium' | 'high';
}
export interface DevicePermissions {
    readonly hasAudioOutput: boolean;
    readonly hasCamera: boolean;
    readonly hasMicrophone: boolean;
    readonly cameraPermissionGranted: boolean;
    readonly cameraPermissionDenied: boolean;
    readonly microphonePermissionDenied: boolean;
    readonly microphonePermissionGranted: boolean;
    readonly requestingCapture: boolean;
    readonly requestingCameraCapture: boolean;
    readonly requestingMicrophoneCapture: boolean;
}
export declare type VideoResolutionTier = [number, {
    height: number;
    width: number;
    frameRate?: number;
}];

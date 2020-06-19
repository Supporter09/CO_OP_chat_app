/// <reference types="node" />
import { EventEmitter } from 'events';
import * as Stanza from 'stanza';
import { State } from '../reducers';
import SignalingClient from './Client';
export default class SFU extends EventEmitter {
    jingle: Stanza.Jingle.SessionManager;
    getState: () => State;
    rpcUrl?: string;
    minimumPeerCount: number;
    peerCount: number;
    enabled: boolean;
    ready: Promise<void>;
    shutdownTimeout: any;
    sessions: Set<string>;
    browser: string;
    sharedMedia: Map<string, {
        pc: RTCPeerConnection;
        ready: boolean;
    }>;
    private client;
    constructor(client: SignalingClient, browser: string);
    setPeerCount(count: number): boolean;
    sendMedia(track: MediaStreamTrack, stream: MediaStream, screenCapture?: boolean): Promise<void>;
    setProfile(sessionId: string, profile: 'high' | 'medium' | 'low'): Promise<void>;
    requestProfile(trackId: string, profile: 'high' | 'medium' | 'low'): void;
    createPeerConnection(session: Stanza.Jingle.Session, options?: RTCConfiguration): RTCPeerConnection;
    getInfoForPeer(peerAddress: string): import("..").Peer | undefined;
    waitForMedia(id: string): Promise<void>;
}

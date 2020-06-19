import { ThunkDispatch } from 'redux-thunk';
import * as Stanza from 'stanza';
import { State } from '../reducers';
import Mesh from './Mesh';
import SFU from './SFU';
export interface ConnectOpts {
    jid: string;
    password: string;
    resource: string;
    wsURL: string;
}
export interface RoomConfig {
    password?: string;
}
export default class SignalingClient {
    xmpp: Stanza.Agent;
    jingle: Stanza.Jingle.SessionManager;
    mesh: Mesh;
    sfu: SFU;
    dispatch: ThunkDispatch<State, void, any>;
    getState: () => State;
    rttBuffers: Map<string, Stanza.RTT.DisplayBuffer>;
    terminating: boolean;
    reconnectTimer: any;
    reconnectAttempts: number;
    constructor(dispatch: ThunkDispatch<State, void, any>, getState: () => State, opts: ConnectOpts);
    connect(): void;
    disconnect(): void;
    joinRoom(roomAddress: string, password?: string): Promise<void>;
    destroyRoom(roomAddress: string): Promise<void>;
    kickPeerFromRoom(roomAddress: string, peerAddress: string): Promise<void>;
    sendRoomPresence(roomAddress: string, opts?: object): void;
    sendAllRoomsPresence(opts?: object): void;
    sendAllCallsSpeakingUpdate(speaking: boolean): void;
    lockRoom(roomAddress: string, password: string): Promise<void>;
    unlockRoom(roomAddress: string): Promise<void>;
    private fetchRoomConfig;
    private checkLockStatus;
    private processMessage;
}

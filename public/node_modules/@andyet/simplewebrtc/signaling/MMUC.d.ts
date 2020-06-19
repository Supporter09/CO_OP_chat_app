import { DefinitionOptions } from 'stanza/jxt';
export interface UserInfo {
    customerData: any;
    roomId: string;
    sessionId: string;
    type: string;
}
export interface MMUCPresence {
    bridged?: boolean;
    media?: 'video' | 'audio' | 'none';
}
export interface MMUCState {
    speaking?: boolean;
}
export interface MMUCStatus {
    active?: boolean;
    media?: 'video' | 'audio' | 'none';
    mode?: string;
    ready?: boolean;
    recordable?: boolean;
    stamp?: Date;
}
export interface MMUCControls {
    startMedia?: {
        media: 'video' | 'audio' | 'none';
    };
    endMedia?: boolean;
    startRecording?: {
        uri?: string;
    };
    endRecording?: boolean;
}
declare module 'stanza' {
    namespace Stanzas {
        interface Presence {
            talkyUserInfo?: UserInfo;
            mmuc?: MMUCPresence;
        }
        interface Message {
            mmuc?: MMUCState;
            mmucStatus?: MMUCStatus;
        }
        interface IQ {
            mmuc?: MMUCControls;
        }
    }
}
declare const defs: DefinitionOptions[];
export default defs;

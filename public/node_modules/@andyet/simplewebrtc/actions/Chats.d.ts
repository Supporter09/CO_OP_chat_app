import { ThunkAction } from 'redux-thunk';
import * as Stanza from 'stanza';
import { State } from '../reducers';
import { CHAT_INCOMING, CHAT_OUTGOING, CHAT_STATE_OUTGOING, DIRECTION_INCOMING, DIRECTION_OUTGOING, RTT_OUTGOING } from '../Constants';
export interface ChatIncoming {
    type: typeof CHAT_INCOMING;
    payload: {
        direction: typeof DIRECTION_INCOMING;
        id: string;
        roomAddress: string;
        senderAddress: string;
        body: string;
        time: Date;
        displayName: string;
        replace?: string;
        acked: true;
    };
}
export interface ChatOutgoing {
    type: typeof CHAT_OUTGOING;
    payload: {
        direction: typeof DIRECTION_OUTGOING;
        id: string;
        roomAddress: string;
        body: string;
        displayName: string;
        replace?: string;
        time: Date;
        acked: false;
    };
}
export interface ChatStateOutgoing {
    type: typeof CHAT_STATE_OUTGOING;
    payload: {
        chatState: 'active' | 'composing' | 'paused';
        roomAddress: string;
    };
}
export interface RTTOutgoing {
    type: typeof RTT_OUTGOING;
    payload: {
        roomAddress: string;
        rtt: Stanza.Stanzas.RTT;
    };
}
export declare type Actions = ChatIncoming | ChatOutgoing | RTTOutgoing;
export interface ChatOptions {
    id?: string;
    body: string;
    displayName?: string;
    time?: Date;
    replace?: string;
}
/**
 * @description
 * Send a chat message to a room.
 *
 * @public
 *
 * @param roomAddress The address of the room to send the chat
 * @param opts See ChatOptions below
 */
export declare function sendChat(roomAddress: string, opts: ChatOptions): ThunkAction<void, State, void, ChatOutgoing>;
/**
 * @description
 * Send a chat state (typing) notification to a room.
 *
 * @public
 *
 * @param roomAddress The address of the room to send the chat state
 * @param chatState The state of the chat
 */
export declare function sendChatState(roomAddress: string, chatState: 'active' | 'composing' | 'paused'): ThunkAction<void, State, void, ChatStateOutgoing>;
/**
 * Receive a chat message from a room.
 *
 * @private
 *
 * @param roomAddress string
 * @param senderAddress string
 * @param opts.body string
 * @param opts.displayName string
 * @param opts.id string
 * @param opts.replace string
 * @param opts.time Date
 */
export declare function receiveChat(roomAddress: string, senderAddress: string, opts: ChatOptions): ChatIncoming;
/**
 * @description
 * Send a realtime-text update to a room.
 *
 * @public
 *
 * @param roomAddress The address of the room to send the RTT update
 * @param rtt
 */
export declare function sendRTT(roomAddress: string, rtt: Stanza.Stanzas.RTT): ThunkAction<void, State, void, RTTOutgoing>;

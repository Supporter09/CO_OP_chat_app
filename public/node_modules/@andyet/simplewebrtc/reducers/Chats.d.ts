import { ChatIncoming, ChatOutgoing } from '../actions';
import { Chat } from '../Definitions';
export interface ChatState {
    [key: string]: Chat;
}
export default function (state: ChatState | undefined, action: ChatIncoming | ChatOutgoing): ChatState;

import { JoinCall, JoinRoomSuccess, LeaveCall, LeaveRoom, SetCallPreference } from '../actions';
import { Call } from '../Definitions';
export interface CallState {
    [key: string]: Call;
}
export default function (state: CallState | undefined, action: JoinCall | LeaveCall | LeaveRoom | JoinRoomSuccess | SetCallPreference): CallState;

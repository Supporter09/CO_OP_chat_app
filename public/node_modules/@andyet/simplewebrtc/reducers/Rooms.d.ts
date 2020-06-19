import { ConnectionStateChange, JoinRoom, JoinRoomFailed, JoinRoomSuccess, LeaveRoom, LockRoom, RoomLocked, RoomUnlocked, SelfUpdated, UnlockRoom } from '../actions';
import { Room } from '../Definitions';
export interface RoomState {
    [key: string]: Room;
}
export default function (state: RoomState | undefined, action: LeaveRoom | JoinRoom | JoinRoomSuccess | JoinRoomFailed | LockRoom | UnlockRoom | RoomLocked | RoomUnlocked | SelfUpdated | ConnectionStateChange): RoomState;

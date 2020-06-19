import { ThunkAction } from 'redux-thunk';
import { JOIN_CALL, LEAVE_CALL, SET_CALL_PREFERENCE } from '../Constants';
import { State } from '../reducers';
export interface JoinCall {
    payload: {
        roomAddress: string;
        desiredMedia: 'video' | 'audio' | 'none' | undefined;
    };
    type: typeof JOIN_CALL;
}
export interface LeaveCall {
    payload: {
        roomAddress: string;
    };
    type: typeof LEAVE_CALL;
}
export interface SetCallPreference {
    payload: {
        roomAddress: string;
        desiredMedia: 'video' | 'audio' | 'none' | undefined;
    };
    type: typeof SET_CALL_PREFERENCE;
}
export declare type Actions = JoinCall | LeaveCall;
export declare function startCall(): void;
export declare function endCall(): void;
/**
 * @description
 * Once joined to a room, using the `joinCall()` action will trigger joining the active call.
 *
 * The `desiredMedia` parameter can be used to control what media is received from peers. By default, it will use the type used in the global `setDesiredMedia()` action.
 *
 * **NOTE:** While the `desiredMedia` parameter controls what is _received_, what is _sent_ is determined by which tracks you have marked as shared via `shareLocalMedia()`. It is entirely possible to send audio and video while only receiving audio.
 *
 * @public
 *
 * @param roomAddress The address of a joined room
 * @param desiredMedia The media type to request from peers
 */
export declare function joinCall(roomAddress: string, desiredMedia?: 'video' | 'audio' | 'none'): ThunkAction<void, State, void, JoinCall>;
/**
 * @description
 * @public
 *
 * @param roomAddress The address of the room hosting the call
 * @param endMedia If leaving the call results in no remaining calls, end user media.
 */
export declare function leaveCall(roomAddress: string, endMedia: boolean): ThunkAction<void, State, void, LeaveCall>;
export declare function changeCallMode(): void;
export declare function pauseCall(): void;
export declare function resumeCall(): void;
export declare function startRecording(): void;
export declare function endRecording(): void;
export declare function pauseRecording(): void;
export declare function resumeRecording(): void;
/**
 * @description
 * Set the desired media preference for media received from peers in a specific call.
 *
 * Controls which media types are _received_ from peers. What media types are _sent_ to peers is left to you to control via `shareLocalMedia()` and `stopSharingLocalMedia()`.
 *
 * If set to 'video', full audio and video will be sent by peers when available.
 *
 * If set to 'audio', only audio and screen shares will be sent by peers.
 *
 * If set to 'none', peers will not send any media.
 *
 * @public
 *
 * @param roomAddress The address of the room hosting the call
 * @param mediaKind The kind of media you wish to receive from peers
 */
export declare function setDesiredMediaForCall(roomAddress: string, desiredMedia: 'audio' | 'video' | 'none'): ThunkAction<void, State, void, SetCallPreference>;
export declare function updateCallState(): void;

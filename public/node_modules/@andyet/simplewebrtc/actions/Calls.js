"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const Selectors_1 = require("../Selectors");
const Media_1 = require("./Media");
// ====================================================================
function startCall() {
    return;
}
exports.startCall = startCall;
function endCall() {
    return;
}
exports.endCall = endCall;
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
function joinCall(roomAddress, desiredMedia) {
    return (dispatch, getState) => {
        dispatch({
            payload: {
                desiredMedia,
                roomAddress
            },
            type: Constants_1.JOIN_CALL
        });
        const state = getState();
        const client = Selectors_1.getClient(state);
        if (client) {
            client.sendRoomPresence(roomAddress);
            client.mesh.updateConnections('join-call');
        }
    };
}
exports.joinCall = joinCall;
/**
 * @description
 * @public
 *
 * @param roomAddress The address of the room hosting the call
 * @param endMedia If leaving the call results in no remaining calls, end user media.
 */
function leaveCall(roomAddress, endMedia) {
    return (dispatch, getState) => {
        const state = getState();
        const originalCalls = Selectors_1.getJoinedCalls(state);
        dispatch({
            payload: {
                roomAddress
            },
            type: Constants_1.LEAVE_CALL
        });
        const updatedState = getState();
        const remainingCalls = Selectors_1.getJoinedCalls(updatedState);
        const client = Selectors_1.getClient(state);
        if (client) {
            client.sendRoomPresence(roomAddress);
            client.mesh.updateConnections('leave-call');
            const speaking = Selectors_1.userIsSpeaking(state);
            if (speaking) {
                client.sendAllCallsSpeakingUpdate(true);
            }
        }
        if (endMedia && originalCalls.length > 0 && remainingCalls.length === 0) {
            dispatch(Media_1.removeAllMedia());
        }
    };
}
exports.leaveCall = leaveCall;
function changeCallMode() {
    return;
}
exports.changeCallMode = changeCallMode;
function pauseCall() {
    return;
}
exports.pauseCall = pauseCall;
function resumeCall() {
    return;
}
exports.resumeCall = resumeCall;
function startRecording() {
    return;
}
exports.startRecording = startRecording;
function endRecording() {
    return;
}
exports.endRecording = endRecording;
function pauseRecording() {
    return;
}
exports.pauseRecording = pauseRecording;
function resumeRecording() {
    return;
}
exports.resumeRecording = resumeRecording;
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
function setDesiredMediaForCall(roomAddress, desiredMedia) {
    return (dispatch, getState) => {
        dispatch({
            payload: {
                desiredMedia,
                roomAddress
            },
            type: Constants_1.SET_CALL_PREFERENCE
        });
        const state = getState();
        const client = Selectors_1.getClient(state);
        if (client) {
            client.sendRoomPresence(roomAddress);
            client.mesh.updateConnections('set-desired-media-for-call');
        }
    };
}
exports.setDesiredMediaForCall = setDesiredMediaForCall;
function updateCallState() {
    return;
}
exports.updateCallState = updateCallState;

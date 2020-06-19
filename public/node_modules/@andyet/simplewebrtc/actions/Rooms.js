"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const Selectors_1 = require("../Selectors");
const API_1 = require("./API");
const Calls_1 = require("./Calls");
// ====================================================================
/**
 * Fetch room configuration from the API.
 *
 * @private
 *
 * @param configUrl string
 * @param roomName string
 * @param auth string
 * @param maxTries number
 * @param timeout number
 */
async function fetchRoomConfig(configUrl, roomName, auth, maxTries = 5, timeout = 1000) {
    let attemptCount = 0;
    let error;
    if (!roomName) {
        console.error('ESWRTC_004. View more information at https://docs.simplewebrtc.com');
        throw new Error('Room name not provided.');
    }
    while (attemptCount <= maxTries) {
        try {
            const data = await fetch(configUrl, {
                body: JSON.stringify({ name: roomName }),
                headers: {
                    authorization: `Bearer ${auth}`
                },
                method: 'POST'
            });
            if (!data.ok) {
                throw new Error('SimpleWebRTC room configuration request failed: ' + data.status);
            }
            const config = (await data.json());
            return config;
        }
        catch (err) {
            error = err;
            attemptCount += 1;
            await API_1.sleep(timeout);
        }
    }
    console.error('ESWRTC_002. View more information at https://docs.simplewebrtc.com');
    if (error) {
        throw error;
    }
    else {
        throw new Error('Could not fetch room config');
    }
}
exports.fetchRoomConfig = fetchRoomConfig;
// ====================================================================
/**
 * @description
 * Attempt to join a room.
 *
 * @public
 *
 * @param roomAddress A user-friendly name for a room
 */
function joinRoom(roomName, opts = {}) {
    return async (dispatch, getState) => {
        const state = getState();
        const client = Selectors_1.getClient(state);
        const apiConfig = Selectors_1.getAPIConfig(state);
        try {
            const config = await fetchRoomConfig(apiConfig.roomConfigUrl, roomName, apiConfig.credential);
            const existingRoom = Selectors_1.getRoomByAddress(state, config.roomAddress);
            if (!existingRoom || (existingRoom && !existingRoom.joined)) {
                dispatch({
                    payload: {
                        autoJoinCall: Selectors_1.isSupportedBrowser(state) &&
                            (opts.autoJoinCall === undefined ? true : opts.autoJoinCall),
                        providedPassword: opts.password,
                        providedRoomName: roomName,
                        roomAddress: config.roomAddress
                    },
                    type: Constants_1.JOIN_ROOM
                });
                if (client) {
                    client.joinRoom(config.roomAddress, opts.password);
                }
            }
        }
        catch (err) {
            dispatch(joinRoomFailed('', false));
        }
    };
}
exports.joinRoom = joinRoom;
/**
 * An attempt to join a room failed.
 *
 * If a password is required to join the room, `passwordRequired` should be set to `true`.
 *
 * @private
 *
 * @param roomAddress string
 * @param passwordRequired boolean
 */
function joinRoomFailed(roomAddress, reasons) {
    if (typeof reasons === 'boolean') {
        reasons = {
            passwordRequired: reasons
        };
    }
    return {
        payload: {
            banned: reasons.banned,
            passwordRequired: reasons.passwordRequired,
            roomAddress,
            roomNotStarted: reasons.roomNotStarted
        },
        type: Constants_1.JOIN_ROOM_FAILED
    };
}
exports.joinRoomFailed = joinRoomFailed;
/**
 * The attempt to join a room succeeded.
 *
 * @private
 *
 * @param roomAddress string
 */
function joinRoomSuccess(roomAddress, selfAddress, roomId, role, affiliation) {
    return (dispatch, getState) => {
        dispatch({
            payload: {
                affiliation,
                id: roomId,
                role,
                roomAddress,
                selfAddress
            },
            type: Constants_1.JOIN_ROOM_SUCCESS
        });
        const client = Selectors_1.getClient(getState());
        if (client) {
            client.mesh.updateConnections('join-room');
        }
    };
}
exports.joinRoomSuccess = joinRoomSuccess;
/**
 * Update the user's information for the room.
 *
 * @private
 *
 * @param roomAddress string
 */
function selfUpdated(roomAddress, selfAddress, roomId, role, affiliation) {
    return (dispatch, getState) => {
        dispatch({
            payload: {
                affiliation,
                id: roomId,
                role,
                roomAddress,
                selfAddress
            },
            type: Constants_1.SELF_UPDATED
        });
    };
}
exports.selfUpdated = selfUpdated;
/**
 * @description
 * Leave a room.
 *
 * @public
 *
 * @param roomAddress The address of the room to leave
 * @param endMedia If leaving the room would result in zero active calls, end user media
 */
function leaveRoom(roomAddress, endMedia = true) {
    return (dispatch, getState) => {
        const state = getState();
        const client = Selectors_1.getClient(state);
        dispatch(Calls_1.leaveCall(roomAddress, endMedia));
        if (client) {
            client.sendRoomPresence(roomAddress, {
                type: 'unavailable'
            });
        }
        dispatch({
            payload: {
                roomAddress
            },
            type: Constants_1.LEAVE_ROOM
        });
        if (client) {
            client.mesh.updateConnections('leave-room');
        }
    };
}
exports.leaveRoom = leaveRoom;
/**
 * @description
 * Lock a room.
 *
 * @public
 *
 * @param roomAddress The address of the room to lock
 * @param password The new room password
 */
function lockRoom(roomAddress, password) {
    return (dispatch, getState) => {
        const state = getState();
        const client = Selectors_1.getClient(state);
        if (client) {
            client.lockRoom(roomAddress, password);
        }
        dispatch({
            payload: {
                password,
                roomAddress
            },
            type: Constants_1.LOCK_ROOM
        });
    };
}
exports.lockRoom = lockRoom;
/**
 * @description
 * Unlock a room to allow anyone to enter without needing a password.
 *
 * @public
 *
 * @param roomAddress The address of the room to unlock
 */
function unlockRoom(roomAddress) {
    return (dispatch, getState) => {
        const state = getState();
        const client = Selectors_1.getClient(state);
        if (client) {
            client.unlockRoom(roomAddress);
        }
        dispatch({
            payload: {
                roomAddress
            },
            type: Constants_1.UNLOCK_ROOM
        });
    };
}
exports.unlockRoom = unlockRoom;
/**
 * @description
 * Destroy a room.
 *
 * @public
 *
 * @param roomAddress  The address of the room to destroy
 */
function destroyRoom(roomAddress) {
    return async (dispatch, getState) => {
        const state = getState();
        const client = Selectors_1.getClient(state);
        try {
            if (client) {
                await client.destroyRoom(roomAddress);
            }
            dispatch({
                payload: {
                    roomAddress
                },
                type: Constants_1.DESTROY_ROOM
            });
        }
        catch (err) {
            console.error(err);
        }
    };
}
exports.destroyRoom = destroyRoom;
/**
 * Room has been locked.
 *
 * @private
 *
 * @param roomAddress string
 * @param password string
 */
function roomLocked(roomAddress, password) {
    return {
        payload: {
            password,
            roomAddress
        },
        type: Constants_1.ROOM_LOCKED
    };
}
exports.roomLocked = roomLocked;
/**
 * Room has been unlocked.
 *
 * @private
 *
 * @param roomAddress string
 */
function roomUnlocked(roomAddress) {
    return {
        payload: {
            roomAddress
        },
        type: Constants_1.ROOM_UNLOCKED
    };
}
exports.roomUnlocked = roomUnlocked;
/**
 * @private
 *
 * @param oldRoomAddress  The address of the room to destroy
 * @param newRoomAddress  The address of the new room to join
 * @param newRoomPassword  New password to use for the room
 */
function roomReplaced(oldRoomAddress, newRoomAddress, newRoomPassword) {
    return async (dispatch, getState) => {
        const state = getState();
        const client = Selectors_1.getClient(state);
        const oldRoom = Selectors_1.getRoomByAddress(state, oldRoomAddress);
        if (!oldRoom) {
            dispatch(joinRoom(newRoomAddress, {
                password: newRoomPassword
            }));
            return;
        }
        const existingNewRoom = Selectors_1.getRoomByAddress(state, newRoomAddress);
        if (!existingNewRoom || (existingNewRoom && !existingNewRoom.joined)) {
            dispatch({
                payload: {
                    autoJoinCall: oldRoom.autoJoinCall,
                    providedPassword: newRoomPassword || oldRoom.providedPassword,
                    providedRoomName: oldRoom.providedName,
                    roomAddress: newRoomAddress
                },
                type: Constants_1.JOIN_ROOM
            });
            if (client) {
                client.joinRoom(newRoomAddress, newRoomPassword || oldRoom.password);
            }
        }
    };
}
exports.roomReplaced = roomReplaced;

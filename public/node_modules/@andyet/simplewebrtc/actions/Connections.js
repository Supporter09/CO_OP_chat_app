"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Stanza = tslib_1.__importStar(require("stanza"));
const Constants_1 = require("../Constants");
// ====================================================================
/**
 * Start tracking a peer connection.
 *
 * @private
 *
 * @param peerAddress string
 * @param sessionId string
 */
function addConnection(peerAddress, sessionId) {
    const roomAddress = Stanza.JID.parse(peerAddress).bare;
    return {
        payload: {
            id: sessionId,
            peerAddress,
            roomAddress
        },
        type: Constants_1.PEER_CONNECTION_ADDED
    };
}
exports.addConnection = addConnection;
/**
 * Stop tracking a peer connection.
 *
 * @private
 *
 * @param peerAddress string
 * @param sessionId string
 */
function removeConnection(peerAddress, sessionId) {
    return {
        payload: {
            id: sessionId,
            peerAddress
        },
        type: Constants_1.PEER_CONNECTION_REMOVED
    };
}
exports.removeConnection = removeConnection;
/**
 * Update the state of a peer connection.
 *
 * @private
 *
 * @param peerAddress string
 * @param sessionId string
 * @param updated.connectionState string
 * @param updated.receivingAudioMediaId string
 * @param updated.receivingVideoMediaId string
 * @param updated.sendingAudioMediaId string
 * @param updated.sendingVideoMediaId string
 */
function updateConnection(peerAddress, sessionId, updated) {
    return {
        payload: {
            id: sessionId,
            peerAddress,
            updated
        },
        type: Constants_1.PEER_CONNECTION_UPDATED
    };
}
exports.updateConnection = updateConnection;

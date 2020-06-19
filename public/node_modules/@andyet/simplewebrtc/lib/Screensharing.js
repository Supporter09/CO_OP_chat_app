"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description
 * Check if screensharing is available for this browser.
 *
 * @public
 */
function isAvailable() {
    if ('getDisplayMedia' in window.navigator.mediaDevices) {
        return true;
    }
    return false;
}
exports.isAvailable = isAvailable;
/**
 * @description
 * Check if screensharing requires a browser extension.
 *
 * @public
 */
function requiresExtension() {
    return false;
}
exports.requiresExtension = requiresExtension;
/**
 * Check if the screensharing extension has already been installed.
 *
 * This is an asynchronous install check that attempts to communicate with
 * the extension.
 *
 * The user gesture flag will be lost when an answer is received, so this
 * function can not be used when a user gesture is required. For those cases,
 * use `checkForExtensionSync` instead to know if the extension _might_ be
 * already installed.
 *
 * @param extensionId string WebStore ID of the screensharing extension
 */
function checkForExtension(extensionId) {
    return Promise.resolve(false);
}
exports.checkForExtension = checkForExtension;
/**
 * Check if the screensharing extension has _possibly_ been installed.
 *
 * This is a synchronous installation check so that user gesture status
 * can be retained.
 *
 * This only checks that the extension ID has been set in sessionStorage. If
 * the extension was removed while the session was active, this function will
 * still return `true` unless the sessionStorage key is manually cleared.
 *
 * @param extensionId string WebStore ID of the screensharing extension
 */
function checkForExtensionSync(extensionId) {
    return false;
}
exports.checkForExtensionSync = checkForExtensionSync;
/**
 * Get the URL for the Chrome WebStore page for the screensharing extension.
 *
 * @param extensionId string WebStore ID of the screensharing extension
 */
function getExtensionURL(extensionId) {
    return `https://chrome.google.com/webstore/detail/${extensionId}`;
}
exports.getExtensionURL = getExtensionURL;

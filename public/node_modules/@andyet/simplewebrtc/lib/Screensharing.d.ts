/**
 * @description
 * Check if screensharing is available for this browser.
 *
 * @public
 */
export declare function isAvailable(): boolean;
/**
 * @description
 * Check if screensharing requires a browser extension.
 *
 * @public
 */
export declare function requiresExtension(): boolean;
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
export declare function checkForExtension(extensionId: string): Promise<boolean>;
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
export declare function checkForExtensionSync(extensionId: string): boolean;
/**
 * Get the URL for the Chrome WebStore page for the screensharing extension.
 *
 * @param extensionId string WebStore ID of the screensharing extension
 */
export declare function getExtensionURL(extensionId: string): string;

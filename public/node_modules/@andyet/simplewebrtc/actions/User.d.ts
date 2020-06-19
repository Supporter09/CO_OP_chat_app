import { ThunkAction } from 'redux-thunk';
import { SET_USER_PREFERENCE } from '../Constants';
import { User } from '../Definitions';
import { State } from '../reducers';
import { SetCallPreference } from './Calls';
export interface SetUserPreference {
    type: typeof SET_USER_PREFERENCE;
    payload: Partial<User>;
}
/**
 * @description
 * Set the preferred display name for the user.
 *
 * Multiple people may have the same display name.
 *
 * Display names are _not_ unique.
 *
 * @public
 *
 * @param displayName The new display name that other peers will see
 */
export declare function setDisplayName(displayName: string): ThunkAction<void, State, void, SetUserPreference>;
/**
 * @description
 * Set the default user preference for media received from peers.
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
 * @param mediaKind The kind of media you wish to receive from peers
 */
export declare function setDesiredMedia(mediaKind: 'audio' | 'video' | 'none'): ThunkAction<void, State, void, SetUserPreference | SetCallPreference>;
/**
 * @description
 * Set the voice activity detection threshold.
 *
 * The number MUST be negative (defaults to -65).
 *
 * @public
 *
 * @param threshold The threshold to detect voice activity
 */
export declare function setVoiceActivityThreshold(threshold?: number): SetUserPreference;
/**
 * @description
 * Enable or disable the use of push-to-talk.
 *
 * @public
 *
 * @param enabled Whether to enable push-to-talk
 */
export declare function setPushToTalk(enabled: boolean): SetUserPreference;
/**
 * @description
 * Set the preferred audio output device.
 *
 * Expicitly pick an audio output sink in supported browsers.
 *
 * By default, browsers will try to use the same device capturing the audio input (e.g. using headset output when the input is the headset mic)
 *
 * @public
 *
 * @param deviceId The id of the device
 */
export declare function setAudioOutputDevice(deviceId?: string): SetUserPreference;
/**
 * @description
 * Set the global output volume limit.
 *
 * The number MUST be between 0 and 1, inclusive (defaults to 1).
 *
 * Scale audio output volume without needing to use the OS volume controls. Useful if your application is expected to be running alongside other applications playing audio.
 *
 * @public
 *
 * @param globalVolumeLimit A value between 0 and 1 inclusive for scaling audio volume
 */
export declare function setGlobalVolumeLimit(globalVolumeLimit?: number): SetUserPreference;

import { ThunkAction } from 'redux-thunk';
import { ADD_MEDIA, MEDIA_UPDATED, REMOVE_MEDIA, SET_VIDEO_RESOLUTION_TIERS } from '../Constants';
import { Media, VideoResolutionTier } from '../Definitions';
import { State } from '../reducers';
import { PeerUpdated } from './Peers';
export interface AddMedia {
    payload: Media;
    type: typeof ADD_MEDIA;
}
export interface RemoveMedia {
    payload: {
        id: string;
    };
    type: typeof REMOVE_MEDIA;
}
export interface MediaUpdated {
    payload: {
        id: string;
        updated: Partial<Media>;
    };
    type: typeof MEDIA_UPDATED;
}
export interface SetVideoResolutionTiers {
    payload: {
        videoResolutionTiers: VideoResolutionTier[];
    };
    type: typeof SET_VIDEO_RESOLUTION_TIERS;
}
export declare type Actions = AddMedia | RemoveMedia | MediaUpdated | SetVideoResolutionTiers;
/**
 * Add a local media track.
 *
 * @private
 *
 * @param track
 * @param stream
 * @param replaces
 */
export declare function addLocalMedia(media: Media): ThunkAction<void, State, void, AddMedia>;
/**
 * @description
 * Adds a local audio track to the set of managed media.
 *
 * **NOTE:** Adding a local audio track does not immediately share the audio to peers. Use `shareLocalMedia()` with the track ID to do so after adding.
 *
 * @public
 *
 * @param track Local audio track
 * @param stream Stream containing the audio track
 * @param replaces
 */
export declare function addLocalAudio(track: MediaStreamTrack, stream: MediaStream, replaces?: string): ThunkAction<void, State, void, AddMedia | RemoveMedia>;
/**
 * @description
 * Adds a local video track to the set of managed media.
 *
 * **NOTE:** Adding a local video track does not immediately share the video to peers. Use `shareLocalMedia()` with the track ID to do so after adding.
 *
 * @public
 *
 * @param track Local video track
 * @param stream Stream containing the video track
 * @param replaces
 */
export declare function addLocalVideo(track: MediaStreamTrack, stream: MediaStream, mirror?: boolean, replaces?: string): ThunkAction<void, State, void, AddMedia | RemoveMedia>;
/**
 * @description
 * Adds a local screenshare video track to the set of managed media.
 *
 * This action is similar to `addLocalVideo()`, but marks the video as a screen so it does not render mirrored like a user facing camera video.
 *
 * **NOTE:** Adding a local screenshare video track does not immediately share the video to peers. Use `shareLocalMedia()` with the track ID to do so after adding.
 *
 * @public
 *
 * @param track Local screenshare video track
 * @param stream Stream containing the video track
 * @param replaces
 */
export declare function addLocalScreen(track: MediaStreamTrack, stream: MediaStream, replaces?: string): ThunkAction<void, State, void, AddMedia | RemoveMedia>;
/**
 * Add a remote media track.
 *
 * @private
 *
 * @param track MediaStreamTrack
 * @param stream MediaStream
 * @param screen boolean
 */
export declare function addRemoteMedia(roomAddress: string, peerAddress: string, id: string, track: MediaStreamTrack, stream: MediaStream, screen: boolean): ThunkAction<void, State, void, AddMedia | RemoveMedia>;
/**
 * @description
 * Remove media.
 *
 * @public
 *
 * @param id Media track ID
 * @param endMedia Whether to end the media track
 */
export declare function removeMedia(id: string, endMedia?: boolean): ThunkAction<void, State, void, RemoveMedia>;
/**
 * Update a media track.
 *
 * @private
 *
 * @param id string
 * @param updated Partial<Media>
 */
export declare function updateMedia(id: string, updated: Partial<Media>): ThunkAction<void, State, void, MediaUpdated | PeerUpdated>;
/**
 * @description
 * Enable local playback of local or remote media.
 *
 * @public
 *
 * @param id Media track ID
 */
export declare function enableMedia(id: string): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Disable local playback of local or remote media.
 *
 * If the media has already been shared, it will continue to be shared, but will be silent or show a black frame.
 *
 * @public
 *
 * @param id A local media track ID
 */
export declare function disableMedia(id: string): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Share a local media track with interested peers.
 *
 * @public
 *
 * @param id The ID of the media track to start sharing
 */
export declare function shareLocalMedia(id: string): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Stop sending a media track to peers, but the media track will still exist and be tracked so that it can be re-shared later. Use `removeMedia()` to fully stop and remove a track.
 *
 * @public
 *
 * @param id The ID of the media track to stop sharing
 */
export declare function stopSharingLocalMedia(id: string): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Adjust the capture resolution for local videos.
 *
 * Screen captures are _not_ affected.
 *
 * The values provided should be the _ideal_ values. The browser will attempt to adjust capture parameters to match as closely as possible, but in some cases may not exactly match what was requested.
 *
 * @public
 *
 * @param width The new, ideal, width for the video
 * @param height The new, ideal, height for the video
 * @param frameRate The new, ideal, frame rate for the video
 */
export declare function adjustVideoCaptureResolution(width: number, height: number, frameRate?: number): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Set the full table of video resolution tiers to use, based on the number of peers.
 *
 * Each tier looks like: [peerCount, { width, height, frameRate }]
 *
 * The tier with a peerCount matching the number of peers requesting video will be used.
 * (Or the tier with the smaller peerCount if the number of peers falls between tiers.)
 *
 * Screen captures are _not_ affected by video resolution tiers.
 *
 * The resolution values provided should be the _ideal_ values. The browser will attempt to adjust capture parameters to match as closely as possible, but in some cases may not exactly match what was requested.
 *
 * @public
 *
 * @param tiers Array of ideal video resolution tiers based on peer count
 */
export declare function setVideoResolutionTiers(tiers: VideoResolutionTier[]): ThunkAction<void, State, void, SetVideoResolutionTiers>;
/**
 * @description
 * Request that video be sent at a different quality profile.
 *
 * The profile can be `low` for small size video, `medium` for mid-range, and `high` for full resolution.
 *
 * @public
 *
 * @param id string
 * @param profile 'high' | 'medium' | 'low'
 */
export declare function requestQualityProfile(id: string, profile: 'high' | 'medium' | 'low'): ThunkAction<void, State, void, RemoveMedia>;
/**
 * @description
 * Mute all audio for a given peer.
 *
 * @public
 *
 * @param peerAddress The address of the peer to mute
 */
export declare function mutePeer(peerAddress: string): ThunkAction<void, State, void, MediaUpdated | PeerUpdated>;
/**
 * @description
 * Unmute all audio for a given peer.
 *
 * @public
 *
 * @param peerAddress The address of the peer to unmute
 */
export declare function unmutePeer(peerAddress: string): ThunkAction<void, State, void, MediaUpdated | PeerUpdated>;
/**
 * @description
 * Disable all captured audio for the user.
 *
 * @public
 */
export declare function muteSelf(): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Enable all captured audio for the user.
 *
 * @public
 */
export declare function unmuteSelf(): ThunkAction<void, State, void, MediaUpdated>;
export interface SelfVideoOptions {
    screenCapture?: boolean;
}
/**
 * @description
 * Disable all captured video for the user.
 *
 * @public
 *
 * @param opts.screenCapture boolean
 */
export declare function pauseSelfVideo(opts?: SelfVideoOptions): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Enable all captured video for the user.
 *
 * @public
 *
 * @param opts.screenCapture boolean
 */
export declare function resumeSelfVideo(opts?: SelfVideoOptions): ThunkAction<void, State, void, MediaUpdated>;
/**
 * @description
 * Remove all local media of a given kind.
 *
 * @public
 *
 * @param kind 'audio' | 'video' | undefined
 */
export declare function removeAllMedia(kind?: 'audio' | 'video'): ThunkAction<void, State, void, RemoveMedia>;

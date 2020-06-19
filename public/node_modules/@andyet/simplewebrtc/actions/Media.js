"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Constants_1 = require("../Constants");
const Hark_1 = tslib_1.__importDefault(require("../lib/Hark"));
const MediaLoaders_1 = require("../lib/MediaLoaders");
const Platform_1 = require("../lib/Platform");
const Selectors_1 = require("../Selectors");
function createHarker(id, stream, dispatch) {
    const hark = new Hark_1.default(stream);
    hark.on('stopped-receiving-volume', inputLost => {
        dispatch(updateMedia(id, {
            inputLost
        }));
    });
    hark.on('started-receiving-volume', () => {
        dispatch(updateMedia(id, {
            inputDetected: true,
            inputLost: undefined
        }));
    });
    hark.on('speaking', () => {
        dispatch(updateMedia(id, {
            speaking: true
        }));
    });
    hark.on('stopped-speaking', () => {
        dispatch(updateMedia(id, {
            lastSpokeAt: new Date(Date.now()),
            speaking: false
        }));
    });
    return hark;
}
// ====================================================================
/**
 * Add a local media track.
 *
 * @private
 *
 * @param track
 * @param stream
 * @param replaces
 */
function addLocalMedia(media) {
    return (dispatch, getState) => {
        let newReplaces = media.replaces;
        if (media.replaces) {
            const state = getState();
            const prevMedia = Selectors_1.getMediaTrack(state, media.replaces);
            if (prevMedia) {
                if (!prevMedia.shared) {
                    dispatch(removeMedia(prevMedia.id));
                    newReplaces = prevMedia.replaces;
                }
            }
        }
        media.track.onmute = () => {
            dispatch(updateMedia(media.id, {
                externalDisabled: true
            }));
        };
        media.track.onunmute = () => {
            dispatch(updateMedia(media.id, {
                externalDisabled: false
            }));
        };
        dispatch({
            payload: {
                ...media,
                replaces: newReplaces
            },
            type: Constants_1.ADD_MEDIA
        });
    };
}
exports.addLocalMedia = addLocalMedia;
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
function addLocalAudio(track, stream, replaces) {
    if (track.kind !== 'audio') {
        throw new Error('Incorrect media type. Expected audio, got: ' + track.kind);
    }
    return (dispatch, getState) => {
        let hark;
        let utilityStream;
        if (Platform_1.isBrowser()) {
            const audio = track.clone();
            utilityStream = new MediaStream();
            utilityStream.addTrack(audio);
            hark = createHarker(track.id, utilityStream, dispatch);
            track.onended = () => {
                if (hark) {
                    hark.stop();
                    audio.stop();
                }
                dispatch(stopSharingLocalMedia(track.id));
                dispatch(removeMedia(track.id));
            };
            MediaLoaders_1.waitForMediaLoaded(track, stream).then(info => {
                dispatch(updateMedia(track.id, info));
            });
        }
        else {
            track.onended = () => {
                dispatch(stopSharingLocalMedia(track.id));
                dispatch(removeMedia(track.id));
            };
        }
        dispatch(addLocalMedia({
            createdAt: Date.now(),
            externalDisabled: track.muted,
            hark,
            id: track.id,
            inputDetected: false,
            inputLost: Date.now(),
            kind: 'audio',
            localDisabled: !track.enabled,
            remoteDisabled: false,
            renderMirrored: false,
            replaces,
            screenCapture: false,
            shared: false,
            source: 'local',
            speaking: false,
            stream,
            track,
            utilityStream,
            volume: -Infinity
        }));
    };
}
exports.addLocalAudio = addLocalAudio;
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
function addLocalVideo(track, stream, mirror = true, replaces) {
    if (track.kind !== 'video') {
        throw new Error('Incorrect media type. Expected video, got: ' + track.kind);
    }
    return (dispatch, getState) => {
        track.onended = () => {
            dispatch(stopSharingLocalMedia(track.id));
            dispatch(removeMedia(track.id));
        };
        if (Platform_1.isBrowser()) {
            MediaLoaders_1.waitForMediaLoaded(track, stream).then(info => {
                dispatch(updateMedia(track.id, info));
            });
        }
        if (!Platform_1.isBrowser() && replaces) {
            // React-Native
            // Remove old video before adding the new one to prevent a mirroring
            // flash when going from 'user' to 'environment' and vice versa
            dispatch(removeMedia(replaces));
        }
        dispatch(addLocalMedia({
            createdAt: Date.now(),
            externalDisabled: track.muted,
            id: track.id,
            kind: 'video',
            localDisabled: !track.enabled,
            remoteDisabled: false,
            renderMirrored: mirror,
            replaces,
            screenCapture: false,
            shared: false,
            source: 'local',
            speaking: false,
            stream,
            track,
            volume: -Infinity
        }));
    };
}
exports.addLocalVideo = addLocalVideo;
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
function addLocalScreen(track, stream, replaces) {
    if (track.kind !== 'video') {
        throw new Error('Incorrect media type. Expected video, got: ' + track.kind);
    }
    return (dispatch, getState) => {
        track.onended = () => {
            dispatch(stopSharingLocalMedia(track.id));
            dispatch(removeMedia(track.id));
        };
        if (Platform_1.isBrowser()) {
            MediaLoaders_1.waitForMediaLoaded(track, stream).then(info => {
                dispatch(updateMedia(track.id, info));
            });
        }
        // Mark the track as detail content to encourage the browser to
        // prioritize image quality over frame rate.
        if ('contentHint' in track && !track.contentHint) {
            track.contentHint = 'detail';
        }
        dispatch(addLocalMedia({
            createdAt: Date.now(),
            externalDisabled: track.muted,
            id: track.id,
            kind: 'video',
            localDisabled: !track.enabled,
            remoteDisabled: false,
            renderMirrored: false,
            replaces,
            screenCapture: true,
            shared: false,
            source: 'local',
            speaking: false,
            stream,
            track,
            volume: -Infinity
        }));
    };
}
exports.addLocalScreen = addLocalScreen;
/**
 * Add a remote media track.
 *
 * @private
 *
 * @param track MediaStreamTrack
 * @param stream MediaStream
 * @param screen boolean
 */
function addRemoteMedia(roomAddress, peerAddress, id, track, stream, screen) {
    return (dispatch, getState) => {
        const state = getState();
        const owner = Selectors_1.getPeerByAddress(state, peerAddress);
        track.onended = () => {
            dispatch(removeMedia(id));
        };
        if (Platform_1.isBrowser()) {
            MediaLoaders_1.waitForMediaLoaded(track, stream, 500).then(info => {
                dispatch(updateMedia(id, info));
            });
            setTimeout(() => {
                MediaLoaders_1.waitForMediaLoaded(track, stream, 500).then(info => {
                    dispatch(updateMedia(id, info));
                });
            }, 500);
        }
        const media = {
            createdAt: Date.now(),
            externalDisabled: track.muted,
            id,
            kind: track.kind,
            localDisabled: owner ? owner.muted : false,
            owner: peerAddress,
            profile: track.kind === 'video' ? 'low' : undefined,
            remoteDisabled: false,
            renderMirrored: false,
            roomAddress,
            screenCapture: track.kind === 'video' && screen,
            source: 'remote',
            speaking: false,
            stream,
            track,
            volume: -Infinity
        };
        dispatch({
            payload: media,
            type: Constants_1.ADD_MEDIA
        });
    };
}
exports.addRemoteMedia = addRemoteMedia;
/**
 * @description
 * Remove media.
 *
 * @public
 *
 * @param id Media track ID
 * @param endMedia Whether to end the media track
 */
function removeMedia(id, endMedia = true) {
    return (dispatch, getState) => {
        const media = Selectors_1.getMediaTrack(getState(), id);
        if (!media) {
            return;
        }
        if (media.shared) {
            dispatch(stopSharingLocalMedia(id));
        }
        dispatch({
            payload: { id },
            type: Constants_1.REMOVE_MEDIA
        });
        if (media.source === 'local') {
            const client = Selectors_1.getClient(getState());
            if (client) {
                client.mesh.updateConnections('remove-media');
            }
        }
        if (endMedia) {
            if (media.track) {
                media.track.stop();
            }
            if (media.utilityStream) {
                for (const track of media.utilityStream.getTracks()) {
                    track.stop();
                }
            }
        }
    };
}
exports.removeMedia = removeMedia;
/**
 * Update a media track.
 *
 * @private
 *
 * @param id string
 * @param updated Partial<Media>
 */
function updateMedia(id, updated) {
    return (dispatch, getState) => {
        const prevState = getState();
        const client = Selectors_1.getClient(prevState);
        const wasSpeaking = Selectors_1.userIsSpeaking(prevState);
        dispatch({
            payload: {
                id,
                updated
            },
            type: Constants_1.MEDIA_UPDATED
        });
        const newState = getState();
        const nowSpeaking = Selectors_1.userIsSpeaking(newState);
        if (client) {
            if (wasSpeaking !== nowSpeaking) {
                client.sendAllCallsSpeakingUpdate(nowSpeaking);
            }
            if (updated.shared !== undefined) {
                client.mesh.updateConnections('update-shared-media');
            }
        }
        const oldMedia = Selectors_1.getMediaTrack(prevState, id);
        const newMedia = Selectors_1.getMediaTrack(newState, id);
        if (newMedia) {
            if (newMedia.track.enabled !== !newMedia.localDisabled) {
                newMedia.track.enabled = !newMedia.localDisabled;
            }
            if (oldMedia &&
                newMedia.source === 'local' &&
                newMedia.localDisabled !== oldMedia.localDisabled &&
                client) {
                client.mesh.notifyPeers(newMedia, newMedia.localDisabled === true ? 'mute' : 'unmute');
            }
            if (newMedia.source === 'remote' && newMedia.owner) {
                const peer = Selectors_1.getPeerByAddress(newState, newMedia.owner);
                if (peer && peer.muted && !newMedia.localDisabled) {
                    dispatch({
                        payload: {
                            peerAddress: newMedia.owner,
                            updated: {
                                muted: false
                            }
                        },
                        type: Constants_1.PEER_UPDATED
                    });
                }
            }
        }
    };
}
exports.updateMedia = updateMedia;
/**
 * @description
 * Enable local playback of local or remote media.
 *
 * @public
 *
 * @param id Media track ID
 */
function enableMedia(id) {
    return updateMedia(id, {
        localDisabled: false
    });
}
exports.enableMedia = enableMedia;
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
function disableMedia(id) {
    return updateMedia(id, {
        localDisabled: true
    });
}
exports.disableMedia = disableMedia;
/**
 * @description
 * Share a local media track with interested peers.
 *
 * @public
 *
 * @param id The ID of the media track to start sharing
 */
function shareLocalMedia(id) {
    return (dispatch, getState) => {
        const state = getState();
        const media = Selectors_1.getMediaTrack(state, id);
        if (!media) {
            return;
        }
        if (media.replaces) {
            dispatch(removeMedia(media.replaces));
        }
        dispatch(updateMedia(id, {
            replaces: undefined,
            shared: true
        }));
    };
}
exports.shareLocalMedia = shareLocalMedia;
/**
 * @description
 * Stop sending a media track to peers, but the media track will still exist and be tracked so that it can be re-shared later. Use `removeMedia()` to fully stop and remove a track.
 *
 * @public
 *
 * @param id The ID of the media track to stop sharing
 */
function stopSharingLocalMedia(id) {
    return (dispatch, getState) => {
        const state = getState();
        const potentialReplacements = Selectors_1.getLocalMedia(state).filter(m => m.replaces === id);
        dispatch(updateMedia(id, {
            shared: false
        }));
        if (potentialReplacements.length) {
            dispatch(removeMedia(id));
        }
    };
}
exports.stopSharingLocalMedia = stopSharingLocalMedia;
/**
 * @private
 */
function constraintNeeded(trackSettings = {}, trackConstraints = {}, setting, target) {
    const currentSetting = trackSettings[setting];
    const currentConstraint = trackConstraints[setting];
    const nearlyEqual = (a, b) => a !== undefined && (a === b || Math.abs(a - b) < 1);
    if (currentSetting && nearlyEqual(currentSetting, target)) {
        return false;
    }
    if (!currentConstraint) {
        return true;
    }
    if (typeof currentConstraint === 'number') {
        return !nearlyEqual(currentConstraint, target);
    }
    return (!nearlyEqual(currentConstraint.ideal, target) && !nearlyEqual(currentConstraint.exact, target));
}
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
function adjustVideoCaptureResolution(width, height, frameRate = 30) {
    return (dispatch, getState) => {
        if (!Platform_1.isBrowser()) {
            return;
        }
        const state = getState();
        const localMedia = Selectors_1.getLocalMedia(state, 'video');
        const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        const newConstraints = {};
        let enabledConstraints = 0;
        if (supportedConstraints.frameRate) {
            newConstraints.frameRate = frameRate;
            enabledConstraints += 1;
        }
        if (supportedConstraints.height) {
            newConstraints.height = { ideal: height };
            enabledConstraints += 1;
        }
        if (supportedConstraints.width) {
            newConstraints.width = { ideal: width };
            enabledConstraints += 1;
        }
        if (enabledConstraints === 0) {
            return;
        }
        for (const video of localMedia) {
            if (video.screenCapture) {
                continue;
            }
            let settings = {};
            if (video.track.getSettings) {
                settings = video.track.getSettings();
            }
            const existingConstraints = video.track.getConstraints();
            if ((!newConstraints.frameRate ||
                !constraintNeeded(settings, existingConstraints, 'frameRate', frameRate)) &&
                (!newConstraints.width ||
                    !constraintNeeded(settings, existingConstraints, 'width', width)) &&
                (!newConstraints.height ||
                    !constraintNeeded(settings, existingConstraints, 'height', height))) {
                continue;
            }
            video.track.applyConstraints(newConstraints).catch(err => {
                console.error('Could not adjust video capture resolution:', err.message);
            });
        }
    };
}
exports.adjustVideoCaptureResolution = adjustVideoCaptureResolution;
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
function setVideoResolutionTiers(tiers) {
    return (dispatch, getState) => {
        dispatch({
            payload: {
                videoResolutionTiers: tiers
            },
            type: Constants_1.SET_VIDEO_RESOLUTION_TIERS
        });
    };
}
exports.setVideoResolutionTiers = setVideoResolutionTiers;
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
function requestQualityProfile(id, profile) {
    return (dispatch, getState) => {
        dispatch(updateMedia(id, {
            profile
        }));
        const client = Selectors_1.getClient(getState());
        if (client) {
            client.sfu.requestProfile(id, profile);
        }
    };
}
exports.requestQualityProfile = requestQualityProfile;
/**
 * @description
 * Mute all audio for a given peer.
 *
 * @public
 *
 * @param peerAddress The address of the peer to mute
 */
function mutePeer(peerAddress) {
    return (dispatch, getState) => {
        const state = getState();
        const media = Selectors_1.getMediaForPeer(state, peerAddress, 'audio');
        for (const audio of media) {
            dispatch(disableMedia(audio.id));
        }
        dispatch({
            payload: {
                peerAddress,
                updated: {
                    muted: true
                }
            },
            type: Constants_1.PEER_UPDATED
        });
    };
}
exports.mutePeer = mutePeer;
/**
 * @description
 * Unmute all audio for a given peer.
 *
 * @public
 *
 * @param peerAddress The address of the peer to unmute
 */
function unmutePeer(peerAddress) {
    return (dispatch, getState) => {
        const state = getState();
        const media = Selectors_1.getMediaForPeer(state, peerAddress, 'audio');
        for (const audio of media) {
            dispatch(enableMedia(audio.id));
        }
        dispatch({
            payload: {
                peerAddress,
                updated: {
                    muted: false
                }
            },
            type: Constants_1.PEER_UPDATED
        });
    };
}
exports.unmutePeer = unmutePeer;
/**
 * @description
 * Disable all captured audio for the user.
 *
 * @public
 */
function muteSelf() {
    return (dispatch, getState) => {
        const state = getState();
        const media = Selectors_1.getLocalMedia(state, 'audio');
        for (const audio of media) {
            dispatch(disableMedia(audio.id));
        }
    };
}
exports.muteSelf = muteSelf;
/**
 * @description
 * Enable all captured audio for the user.
 *
 * @public
 */
function unmuteSelf() {
    return (dispatch, getState) => {
        const state = getState();
        const media = Selectors_1.getLocalMedia(state, 'audio');
        for (const audio of media) {
            dispatch(enableMedia(audio.id));
        }
    };
}
exports.unmuteSelf = unmuteSelf;
/**
 * @description
 * Disable all captured video for the user.
 *
 * @public
 *
 * @param opts.screenCapture boolean
 */
function pauseSelfVideo(opts = { screenCapture: true }) {
    return (dispatch, getState) => {
        const state = getState();
        const media = Selectors_1.getLocalMedia(state, 'video');
        for (const video of media) {
            if (!video.screenCapture || (opts.screenCapture && video.screenCapture)) {
                dispatch(disableMedia(video.id));
            }
        }
    };
}
exports.pauseSelfVideo = pauseSelfVideo;
/**
 * @description
 * Enable all captured video for the user.
 *
 * @public
 *
 * @param opts.screenCapture boolean
 */
function resumeSelfVideo(opts = { screenCapture: true }) {
    return (dispatch, getState) => {
        const state = getState();
        const media = Selectors_1.getLocalMedia(state, 'video');
        for (const video of media) {
            if (!video.screenCapture || (opts.screenCapture && video.screenCapture)) {
                dispatch(enableMedia(video.id));
            }
        }
    };
}
exports.resumeSelfVideo = resumeSelfVideo;
/**
 * @description
 * Remove all local media of a given kind.
 *
 * @public
 *
 * @param kind 'audio' | 'video' | undefined
 */
function removeAllMedia(kind) {
    return (dispatch, getState) => {
        const state = getState();
        const localMedia = Selectors_1.getLocalMedia(state, kind);
        for (const media of localMedia) {
            dispatch(removeMedia(media.id));
        }
    };
}
exports.removeAllMedia = removeAllMedia;

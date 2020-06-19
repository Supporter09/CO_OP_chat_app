"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Actions = tslib_1.__importStar(require("../actions"));
const Platform_1 = require("../lib/Platform");
const Selectors_1 = require("../Selectors");
function mergeConstraints(defaults, provided, additional) {
    const disabled = additional === false || (!additional && !provided);
    if (disabled) {
        return false;
    }
    provided = provided === true ? {} : provided;
    additional = additional === true ? {} : additional;
    return {
        ...defaults,
        ...provided,
        ...additional
    };
}
/**
 * @description
 * The `<RequestUserMedia />` component can be used to request user audio and video media.
 *
 * @public
 *
 * @example
 * <div>
 *   {/* Request audio and immediately share *\/}
 *   <RequestUserMedia audio auto share />
 *   {/* Request audio and video, but use custom renderer to trigger it *\/}
 *   <RequestUserMedia audio video share
 *    render={({ getUserMedia }) => (
 *    <button onClick={getUserMedia}>Get Media</button>
 *   )} />
 * </div>
 */
class RequestUserMedia extends React.Component {
    constructor(props) {
        super(props);
        this.errorCount = 0;
    }
    async getMedia(additional = {}) {
        let stream;
        const defaultAudioConstraints = {};
        if (Platform_1.isBrowser()) {
            const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
            let audioProcessing = true;
            if (this.props.audioProcessing !== undefined) {
                audioProcessing = this.props.audioProcessing;
            }
            for (const constraint of ['autoGainControl', 'echoCancellation', 'noiseSuppression']) {
                if (supportedConstraints[constraint]) {
                    defaultAudioConstraints[constraint] =
                        audioProcessing && this.props.audioTypeHint !== 'music';
                }
            }
        }
        const audioConstraints = mergeConstraints(defaultAudioConstraints, this.props.audio, additional.audio);
        const videoConstraints = mergeConstraints({}, this.props.video, additional.video);
        try {
            if (!navigator.mediaDevices) {
                throw new Error('getUserMedia not supported');
            }
            this.props.deviceCaptureRequest(!!videoConstraints, !!audioConstraints);
            if (audioConstraints) {
                // Multiple browser implementations only allow capturing one audio source at a time.
                // As such, we stop all existing audio captures before requesting a new one.
                await this.props.removeAllMedia('audio');
            }
            stream = await navigator.mediaDevices.getUserMedia({
                audio: audioConstraints,
                video: videoConstraints
            });
        }
        catch (err) {
            this.errorCount += 1;
            if (err.name === 'AbortError' && this.errorCount < 12) {
                // We still sometimes can't start new audio after recently ending previous
                // audio. So we will try to attempt the request again a few times.
                setTimeout(() => this.getMedia(additional), 100 + Math.pow(2, this.errorCount));
                return {};
            }
            if (err.name === 'NotAllowedError' || err.name === 'SecurityError') {
                if (!!audioConstraints) {
                    this.props.microphonePermissionDenied();
                }
                if (!!videoConstraints) {
                    this.props.cameraPermissionDenied();
                }
            }
            this.props.deviceCaptureRequest(false, false);
            if (this.props.onError) {
                this.props.onError(err);
            }
            return {};
        }
        this.errorCount = 0;
        const audio = stream.getAudioTracks()[0];
        const video = stream.getVideoTracks()[0];
        if (audio) {
            if ('contentHint' in audio) {
                audio.contentHint = this.props.audioTypeHint;
            }
            this.props.addLocalAudio(audio, stream, this.props.replaceAudio);
            if (this.props.share !== false) {
                this.props.shareLocalMedia(audio.id);
            }
        }
        else if (!!audioConstraints) {
            this.props.microphonePermissionDenied();
        }
        if (video) {
            if ('contentHint' in video) {
                video.contentHint = this.props.videoTypeHint;
            }
            if (this.props.screenCapture) {
                this.props.addLocalScreen(video, stream, this.props.replaceVideo);
            }
            else {
                this.props.addLocalVideo(video, stream, this.props.mirrored, this.props.replaceVideo);
            }
            if (this.props.share !== false) {
                this.props.shareLocalMedia(video.id);
            }
        }
        else if (!!videoConstraints) {
            this.props.cameraPermissionDenied();
        }
        await this.props.fetchDevices();
        await this.props.deviceCaptureRequest(false, false);
        const trackIds = {
            audio: audio ? audio.id : undefined,
            video: video ? video.id : undefined
        };
        if (this.props.onSuccess) {
            this.props.onSuccess(trackIds);
        }
        return trackIds;
    }
    componentDidMount() {
        if (this.props.auto) {
            this.getMedia();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.auto && this.props.auto !== prevProps.auto) {
            this.getMedia();
        }
    }
    render() {
        const renderProps = this.getMedia.bind(this);
        const captureState = {
            requestingCameraCapture: this.props.requestingCameraCapture,
            requestingCapture: this.props.requestingCapture,
            requestingMicrophoneCapture: this.props.requestingMicrophoneCapture
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        if (render) {
            return render(renderProps, captureState);
        }
        else if (this.props.children) {
            return this.props.children;
        }
        if (this.props.auto) {
            return null;
        }
        else {
            return React.createElement("button", { onClick: renderProps }, "Request Media");
        }
    }
}
exports.RequestUserMedia = RequestUserMedia;
function mapStateToProps(state, props) {
    const permissions = Selectors_1.getDevicePermissions(state);
    return {
        ...props,
        requestingCameraCapture: permissions.requestingCameraCapture,
        requestingCapture: permissions.requestingCapture,
        requestingMicrophoneCapture: permissions.requestingMicrophoneCapture
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addLocalAudio: (track, stream, replace) => dispatch(Actions.addLocalAudio(track, stream, replace)),
        addLocalScreen: (track, stream, replace) => dispatch(Actions.addLocalScreen(track, stream, replace)),
        addLocalVideo: (track, stream, mirrored, replace) => dispatch(Actions.addLocalVideo(track, stream, mirrored, replace)),
        cameraPermissionDenied: (err) => dispatch(Actions.cameraPermissionDenied(err)),
        deviceCaptureRequest: (camera, microphone) => dispatch(Actions.deviceCaptureRequest(camera, microphone)),
        fetchDevices: () => dispatch(Actions.fetchDevices()),
        microphonePermissionDenied: (err) => dispatch(Actions.microphonePermissionDenied(err)),
        removeAllMedia: (kind) => dispatch(Actions.removeAllMedia(kind)),
        shareLocalMedia: (id) => dispatch(Actions.shareLocalMedia(id))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RequestUserMedia);

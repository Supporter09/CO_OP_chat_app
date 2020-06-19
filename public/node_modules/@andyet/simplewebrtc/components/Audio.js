"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
/**
 * @description
 * Local and remote audio tracks can be played with the `<Audio/>` component.
 *
 * The provided `media` property can include `remoteDisabled` and `localDisabled` fields. If either of those properties are `true`, audio playback will be muted.
 *
 * @public
 *
 * @example
 * <Audio
 *  media={getMediaTrack(store, 'some-media-id')}
 *  volume={getGlobalVolumeLimit(store)}
 *  outputDevice={getAudioOutputDevice(store)}
 * />
 */
class Audio extends React.Component {
    componentDidMount() {
        this.setup(true);
    }
    componentDidUpdate(prev) {
        if (prev.media && prev.media.id !== this.props.media.id) {
            this.setup(true);
        }
        else {
            this.setup(false);
        }
    }
    setup(newStream) {
        this.audio.oncontextmenu = e => {
            e.preventDefault();
        };
        // INTEROP ISSUE (8-02-19): Audio not playing in Safari if from a stream with paused video.
        // https://groups.google.com/forum/#!msg/discuss-webrtc/Gqo2MfnQWkw/x7nKi6UsFQAJ
        if (newStream) {
            if (window && window.safari) {
                this.stream = new MediaStream(this.props.media.stream.getAudioTracks());
            }
            else {
                this.stream = this.props.media.stream;
            }
            this.audio.srcObject = this.stream;
        }
        if (this.props.volume || this.props.volume === 0) {
            this.audio.volume = this.props.volume;
        }
        if (this.props.media.localDisabled ||
            this.props.media.remoteDisabled ||
            this.props.volume === 0) {
            this.audio.muted = true;
        }
        else {
            this.audio.muted = false;
        }
        if (this.props.outputDevice &&
            this.audio.sinkId !== this.props.outputDevice &&
            this.audio.setSinkId) {
            this.audio.pause();
            this.audio
                .setSinkId(this.props.outputDevice)
                .then(() => {
                this.audio.play();
            })
                .catch((err) => {
                this.audio.play();
                console.error(err);
            });
        }
        else {
            this.audio.autoplay = true;
        }
    }
    render() {
        return (React.createElement("audio", Object.assign({ ref: (el) => {
                this.audio = el;
            } }, { playsInline: true })));
    }
}
exports.default = Audio;

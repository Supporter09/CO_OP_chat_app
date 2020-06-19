"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Actions = tslib_1.__importStar(require("../actions"));
const Selectors_1 = require("../Selectors");
/**
 * @description
 *
 * @public
 *
 */
class RequestDisplayMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionInstalled: false,
            extensionInstalling: false,
            extensionRequired: false
        };
    }
    async getDisplayMedia() {
        try {
            if (!navigator.mediaDevices.getDisplayMedia) {
                throw new Error('getDisplayMedia not supported');
            }
            const stream = await navigator.mediaDevices.getDisplayMedia({
                audio: this.props.audio,
                video: true
            });
            const video = stream.getVideoTracks()[0];
            if ('contentHint' in video) {
                video.contentHint = this.props.videoTypeHint || 'detail';
            }
            this.props.addLocalScreen(video, stream);
            if (this.props.share !== false) {
                this.props.shareLocalMedia(video.id);
            }
            const audio = stream.getAudioTracks()[0];
            if (audio) {
                if ('contentHint' in audio) {
                    audio.contentHint = this.props.audioTypeHint;
                }
                this.props.addLocalAudio(audio, stream);
                if (this.props.share !== false) {
                    this.props.shareLocalMedia(audio.id);
                }
            }
        }
        catch (err) {
            console.log(err, err.message, err.name);
        }
    }
    render() {
        if (this.props.render) {
            const available = 'getDisplayMedia' in navigator.mediaDevices;
            return this.props.render(this.getDisplayMedia.bind(this), {
                available,
                extensionId: this.props.extensionId,
                extensionInstalled: false,
                extensionInstalling: false,
                extensionRequired: false,
                listenForInstallation: (interval) => undefined,
                ready: available
            });
        }
        return React.createElement("button", { onClick: () => this.getDisplayMedia() }, "Start Screenshare");
    }
}
exports.RequestDisplayMedia = RequestDisplayMedia;
function mapStateToProps(state, ownProps) {
    const config = Selectors_1.getAPIConfig(state);
    return {
        extensionId: ownProps.extensionId || config.screensharingExtensions.chrome
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addLocalAudio: (track, stream) => dispatch(Actions.addLocalAudio(track, stream)),
        addLocalScreen: (track, stream) => dispatch(Actions.addLocalScreen(track, stream)),
        shareLocalMedia: (id) => dispatch(Actions.shareLocalMedia(id))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RequestDisplayMedia);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Selectors_1 = require("../Selectors");
const Audio_1 = tslib_1.__importDefault(require("./Audio"));
/**
 * @description
 * The remote audio player component will play all enabled remote audio tracks. Only one instance needs to be used.
 *
 * @public
 *
 * @example
 * <div>
 *   {/* We can always keep the audio player around *\/}
 *   <RemoteAudioPlayer />
 *   <Connected>
 *     <p>Main app UI</p>
 *   </Connected>
 * </div>
 */
class RemoteAudioPlayer extends React.Component {
    render() {
        const sources = this.props.audioSources || [];
        const globalVolumeLimit = this.props.globalVolumeLimit;
        return (React.createElement(React.Fragment, null, sources.map(audio => (React.createElement(Audio_1.default, { key: audio.media.id, media: audio.media, volume: globalVolumeLimit * audio.volumeLimit, outputDevice: this.props.outputDevice })))));
    }
}
exports.RemoteAudioPlayer = RemoteAudioPlayer;
function mapStateToProps(state, props) {
    const media = Selectors_1.getRemoteMedia(state, 'audio');
    const audioSources = [];
    for (const audio of media) {
        const peer = Selectors_1.getPeerByAddress(state, audio.owner);
        audioSources.push({
            media: audio,
            volumeLimit: (peer ? peer.volumeLimit : 1) || 1
        });
    }
    return {
        audioSources,
        globalVolumeLimit: Selectors_1.getGlobalVolumeLimit(state),
        outputDevice: Selectors_1.getAudioOutputDevice(state)
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(RemoteAudioPlayer);

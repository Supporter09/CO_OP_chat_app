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
class UserControls extends React.Component {
    render() {
        const renderProps = {
            customerData: this.props.customerData || {},
            deafen: this.props.deafen,
            hasAudio: this.props.hasAudio || false,
            hasScreenCapture: this.props.hasScreenCapture || false,
            hasVideo: this.props.hasVideo || false,
            isDeafened: this.props.isDeafened || false,
            isMuted: this.props.isMuted || false,
            isPaused: this.props.isPaused || false,
            isScreenCapturePaused: this.props.isScreenCapturePaused || false,
            isSpeaking: this.props.isSpeaking || false,
            isSpeakingWhileMuted: this.props.isSpeakingWhileMuted || false,
            mute: this.props.mute,
            pauseVideo: this.props.pauseVideo,
            resumeVideo: this.props.resumeVideo,
            setAudioOutputDevice: this.props.setAudioOutputDevice,
            setDisplayName: this.props.setDisplayName,
            setGlobalVolumeLimit: this.props.setGlobalVolumeLimit,
            setVoiceActivityThreshold: this.props.setVoiceActivityThreshold,
            undeafen: this.props.undeafen,
            unmute: this.props.unmute,
            user: this.props.user
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        if (render) {
            return render(renderProps);
        }
        return this.props.children;
    }
}
exports.UserControls = UserControls;
function mapStateToProps(state, props) {
    const localMedia = Selectors_1.getLocalMedia(state);
    let isMuted = true;
    let isPaused = true;
    let isScreenCapturePaused = true;
    let hasAudio = false;
    let hasVideo = false;
    let hasScreenCapture = false;
    for (const media of localMedia) {
        if (media.kind === 'audio') {
            hasAudio = true;
            isMuted = isMuted && media.localDisabled;
        }
        if (media.kind === 'video') {
            if (!media.screenCapture) {
                hasVideo = true;
                isPaused = isPaused && media.localDisabled;
            }
            else {
                hasScreenCapture = true;
                isScreenCapturePaused = isScreenCapturePaused && media.localDisabled;
            }
        }
    }
    const customerData = Selectors_1.getUserCustomerData(state);
    const user = Selectors_1.getUser(state);
    const globalVolumeLimit = Selectors_1.getGlobalVolumeLimit(state);
    const isSpeaking = Selectors_1.userIsSpeaking(state, false);
    const isSpeakingWhileMuted = Selectors_1.userIsSpeakingWhileMuted(state, false);
    return {
        customerData,
        hasAudio,
        hasScreenCapture,
        hasVideo,
        isDeafened: globalVolumeLimit === 0,
        isMuted,
        isPaused,
        isScreenCapturePaused,
        isSpeaking,
        isSpeakingWhileMuted,
        user
    };
}
function mapDispatchToProps(dispatch, props) {
    return {
        deafen: () => dispatch(Actions.setGlobalVolumeLimit(0)),
        mute: () => dispatch(Actions.muteSelf()),
        pauseVideo: (opts) => dispatch(Actions.pauseSelfVideo(opts)),
        resumeVideo: (opts) => dispatch(Actions.resumeSelfVideo(opts)),
        setAudioOutputDevice: (deviceId) => dispatch(Actions.setAudioOutputDevice(deviceId)),
        setDisplayName: (name) => dispatch(Actions.setDisplayName(name)),
        setGlobalVolumeLimit: (volumeLimit) => dispatch(Actions.setGlobalVolumeLimit(volumeLimit)),
        setVoiceActivityThreshold: (threshold) => dispatch(Actions.setVoiceActivityThreshold(threshold)),
        undeafen: () => dispatch(Actions.setGlobalVolumeLimit(1)),
        unmute: () => dispatch(Actions.unmuteSelf())
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(UserControls);

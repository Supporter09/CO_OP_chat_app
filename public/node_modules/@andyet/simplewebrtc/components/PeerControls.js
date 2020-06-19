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
class PeerControls extends React.Component {
    render() {
        const renderProps = {
            hasActiveMicrophone: this.props.hasActiveMicrophone,
            isMuted: this.props.isMuted,
            isSpeaking: this.props.isSpeaking,
            kick: this.props.kick,
            mute: this.props.mute,
            peer: this.props.peer,
            setVolumeLimit: this.props.setVolumeLimit,
            unmute: this.props.unmute
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children;
    }
}
exports.PeerControls = PeerControls;
function mapStateToProps(state, props) {
    const peer = Selectors_1.getPeerByAddress(state, props.peer.address) || {};
    const media = Selectors_1.getMediaForPeer(state, props.peer.address, 'audio');
    const anyRemoteEnabled = media.filter(audio => !audio.remoteDisabled).length > 0;
    return {
        hasActiveMicrophone: anyRemoteEnabled,
        isMuted: peer.muted || false,
        isSpeaking: peer.speaking || false
    };
}
function mapDispatchToProps(dispatch, props) {
    return {
        kick: () => dispatch(Actions.kickPeer(props.peer.roomAddress, props.peer.userAddress)),
        mute: () => dispatch(Actions.mutePeer(props.peer.address)),
        setVolumeLimit: (volume) => dispatch(Actions.limitPeerVolume(props.peer.address, volume)),
        unmute: () => dispatch(Actions.unmutePeer(props.peer.address))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PeerControls);

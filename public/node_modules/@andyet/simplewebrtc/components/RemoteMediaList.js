"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Selectors_1 = require("../Selectors");
/**
 * @description
 *
 * @public
 *
 */
class RemoteMediaList extends React.Component {
    render() {
        const renderProps = {
            audio: this.props.audio,
            media: this.props.media || [],
            peer: this.props.peer,
            video: this.props.video
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children;
    }
}
function mapStateToProps(state, props) {
    let desiredMedia;
    if (props.audio && !props.video) {
        desiredMedia = 'audio';
    }
    else if (!props.audio && props.video) {
        desiredMedia = 'video';
    }
    let media = [];
    if (props.peer) {
        media = Selectors_1.getMediaForPeer(state, props.peer, desiredMedia);
    }
    else {
        media = Selectors_1.getRemoteMedia(state, desiredMedia);
    }
    return {
        ...props,
        media
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(RemoteMediaList);

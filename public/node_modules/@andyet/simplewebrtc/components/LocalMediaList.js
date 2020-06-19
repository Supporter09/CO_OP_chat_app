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
class LocalMediaList extends React.Component {
    render() {
        const renderProps = {
            audio: this.props.audio,
            media: this.props.media || [],
            removeMedia: this.props.removeMedia,
            screen: this.props.screen,
            shareLocalMedia: this.props.shareLocalMedia,
            shared: this.props.shared,
            stopSharingLocalMedia: this.props.stopSharingLocalMedia,
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
    if (!props.audio && props.video) {
        desiredMedia = 'video';
    }
    let media = [];
    if (props.shared) {
        media = Selectors_1.getSharedMedia(state, desiredMedia);
    }
    else {
        media = Selectors_1.getLocalMedia(state, desiredMedia);
    }
    media = media.filter(m => {
        if (m.kind === 'video' && props.screen !== undefined) {
            return m.screenCapture === props.screen;
        }
        if (m.shared && props.shared === false) {
            return false;
        }
        return true;
    });
    return {
        ...props,
        media
    };
}
function mapDispatchToProps(dispatch) {
    return {
        removeMedia: (id) => dispatch(Actions.removeMedia(id)),
        shareLocalMedia: (id) => dispatch(Actions.shareLocalMedia(id)),
        stopSharingLocalMedia: (id) => dispatch(Actions.stopSharingLocalMedia(id))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LocalMediaList);

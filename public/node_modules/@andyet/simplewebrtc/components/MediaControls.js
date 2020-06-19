"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Actions = tslib_1.__importStar(require("../actions"));
/**
 * @description
 *
 * @public
 *
 */
class MediaControls extends React.Component {
    render() {
        const renderProps = {
            disable: this.props.disableMedia,
            enable: this.props.enableMedia,
            isEnabled: !this.props.media.localDisabled && !this.props.media.remoteDisabled,
            isShared: this.props.media.source === 'local' && !!this.props.media.shared,
            media: this.props.media,
            remove: this.props.removeLocalMedia,
            share: this.props.shareLocalMedia,
            stopSharing: () => {
                this.props.stopSharingLocalMedia();
                if (this.props.autoRemove) {
                    this.props.removeLocalMedia();
                    this.props.media.track.stop();
                }
            }
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children;
    }
}
exports.MediaControls = MediaControls;
function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch, props) {
    return {
        disableMedia: () => dispatch(Actions.disableMedia(props.media.id)),
        enableMedia: () => dispatch(Actions.enableMedia(props.media.id)),
        removeLocalMedia: () => dispatch(Actions.removeMedia(props.media.id)),
        shareLocalMedia: () => dispatch(Actions.shareLocalMedia(props.media.id)),
        stopSharingLocalMedia: () => dispatch(Actions.stopSharingLocalMedia(props.media.id))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MediaControls);

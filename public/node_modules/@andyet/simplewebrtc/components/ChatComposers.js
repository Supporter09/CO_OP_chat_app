"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const PeerList_1 = tslib_1.__importDefault(require("./PeerList"));
/**
 * @description
 *
 * @public
 *
 */
class ChatComposers extends React.Component {
    render() {
        const renderProps = {
            composers: this.props.composers || []
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        if (render) {
            return (React.createElement(PeerList_1.default, { room: this.props.room, chatState: "composing", render: ({ peers }) => render({ composers: peers }) }));
        }
        else if (this.props.children) {
            return (React.createElement(PeerList_1.default, { room: this.props.room, chatState: "composing" }, this.props.children));
        }
        return (React.createElement(PeerList_1.default, { room: this.props.room, chatState: "composing", render: ({ peers }) => {
                switch (peers.length) {
                    case 0:
                        return null;
                    case 1: {
                        const peer0 = peers[0].displayName || 'Anonymous';
                        return React.createElement("div", { className: this.props.className }, `${peer0} is typing...`);
                    }
                    case 2: {
                        const peer0 = peers[0].displayName || 'Anonymous';
                        const peer1 = peers[1].displayName || 'Anonymous';
                        return (React.createElement("div", { className: this.props.className }, `${peer0} and ${peer1} are typing...`));
                    }
                    default:
                        return React.createElement("div", { className: this.props.className }, "People are typing...");
                }
            } }));
    }
}
exports.default = ChatComposers;

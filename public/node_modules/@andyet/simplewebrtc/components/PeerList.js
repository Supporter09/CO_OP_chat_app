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
class PeerList extends React.Component {
    render() {
        const renderProps = {
            chatState: this.props.chatState || undefined,
            joinedCall: this.props.joinedCall || false,
            peers: this.props.peers || [],
            speaking: this.props.speaking || false
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children;
    }
}
function mapStateToProps(state, props) {
    const filters = [
        'joinedCall',
        'speaking',
        'chatState',
        'requestingAttention'
    ];
    const peers = Selectors_1.getPeersForRoom(state, props.room).filter((peer) => {
        for (const filter of filters) {
            if (props[filter] !== undefined && peer[filter] !== props[filter]) {
                return false;
            }
        }
        return true;
    });
    return {
        ...props,
        peers
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(PeerList);

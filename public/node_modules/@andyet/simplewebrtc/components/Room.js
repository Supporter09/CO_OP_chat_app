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
class Room extends React.Component {
    componentDidMount() {
        if (this.props.connectionState === 'connected') {
            this.props.join();
        }
    }
    componentWillUnmount() {
        this.props.leave(this.props.roomAddress);
    }
    componentDidUpdate(prevProps) {
        if (this.props.connectionState !== 'connected') {
            return;
        }
        if (this.props.connectionState !== prevProps.connectionState) {
            this.props.join();
            return;
        }
        if (!this.props.room) {
            return;
        }
        if (this.props.password !== prevProps.password) {
            if (this.props.room.roomState === 'joined') {
                if (this.props.password) {
                    this.props.lock(this.props.roomAddress, this.props.password);
                }
                else {
                    this.props.unlock(this.props.roomAddress);
                }
            }
            else {
                this.props.join();
            }
        }
    }
    render() {
        const renderProps = {
            call: this.props.call || {},
            joined: this.props.room ? this.props.room.joined : false,
            localMedia: this.props.localMedia || [],
            peers: this.props.peers || [],
            remoteMedia: this.props.remoteMedia || [],
            room: this.props.room || {}
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children;
    }
}
function mapStateToProps(state, props) {
    let room;
    if (props.roomAddress) {
        room = Selectors_1.getRoomByAddress(state, props.roomAddress);
    }
    if (!room && props.name) {
        room = Selectors_1.getRoomByProvidedName(state, props.name);
    }
    return {
        call: room ? Selectors_1.getCallForRoom(state, room.address) : undefined,
        connectionState: Selectors_1.getConnectionState(state),
        localMedia: Selectors_1.getLocalMedia(state),
        peers: room ? Selectors_1.getPeersForRoom(state, room.address) : [],
        remoteMedia: Selectors_1.getRemoteMedia(state),
        room,
        roomAddress: room ? room.address : undefined,
        roomState: room ? room.roomState : 'joining'
    };
}
function mapDispatchToProps(dispatch, props) {
    return {
        destroy: (roomAddress) => dispatch(Actions.destroyRoom(roomAddress)),
        join: () => dispatch(Actions.joinRoom(props.name, { password: props.password || undefined })),
        leave: (roomAddress) => dispatch(Actions.leaveRoom(roomAddress)),
        lock: (roomAddress, password) => dispatch(Actions.lockRoom(roomAddress, password)),
        unlock: (roomAddress) => dispatch(Actions.unlockRoom(roomAddress))
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Room);

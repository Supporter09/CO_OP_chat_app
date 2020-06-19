"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Actions = tslib_1.__importStar(require("../actions"));
const Platform_1 = require("../lib/Platform");
const Selectors_1 = require("../Selectors");
function mapStateToProps(state) {
    return {
        connectionState: Selectors_1.getConnectionState(state),
        isSupportedBrowser: Selectors_1.isSupportedBrowser(state),
        localMedia: Selectors_1.getLocalMedia(state)
    };
}
function mapDispatchToProps(dispatch, props) {
    return {
        connect: () => dispatch(Actions.connect(props.configUrl, props.userData)),
        disconnect: () => dispatch(Actions.disconnect()),
        removeAllMedia: () => dispatch(Actions.removeAllMedia()),
        setDefaultValues: () => {
            if (props.desiredMedia) {
                dispatch(Actions.setDesiredMedia(props.desiredMedia));
            }
            if (props.displayName) {
                dispatch(Actions.setDisplayName(props.displayName));
            }
            if (props.videoResolutionTiers) {
                dispatch(Actions.setVideoResolutionTiers(props.videoResolutionTiers));
            }
        }
    };
}
/**
 * @description
 *
 * @public
 *
 */
class Provider extends React.Component {
    componentDidMount() {
        this.props.setDefaultValues();
        this.props.connect();
        if (Platform_1.isBrowser()) {
            window.addEventListener('online', () => {
                // Trigger reconnection attempt with up to 5 seconds of jitter
                setTimeout(() => {
                    if (this.props.connectionState !== 'connected' &&
                        this.props.connectionState !== 'connecting') {
                        this.props.disconnect();
                        this.props.connect();
                    }
                }, Math.random() * 5000);
            });
            window.addEventListener('offline', () => {
                // Trigger disconnected state without waiting for websocket connection to timeout
                setTimeout(() => {
                    if (!navigator.onLine) {
                        this.props.disconnect();
                    }
                }, 5000);
            });
        }
    }
    componentWillUnmount() {
        this.props.removeAllMedia();
        this.props.disconnect();
    }
    render() {
        const renderProps = {
            connectionState: this.props.connectionState
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children;
    }
}
function createConnectionStateComponent(connectionState) {
    return react_redux_1.connect(mapStateToProps)(class extends React.Component {
        render() {
            const renderProps = {
                connectionState: this.props.connectionState
            };
            let render = this.props.render;
            if (!render && typeof this.props.children === 'function') {
                render = this.props.children;
            }
            if (this.props.connectionState === connectionState) {
                return render ? render(renderProps) : this.props.children;
            }
            return null;
        }
    });
}
/**
 * @description
 *
 * @public
 * @example
 * <NotSupported>
 *   <p>This browser does not support WebRTC media features.</p>
 * </NotSupported>
 */
exports.NotSupported = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {
    render() {
        if (!this.props.isSupportedBrowser) {
            return this.props.children;
        }
        return null;
    }
});
/**
 * @description
 *
 * @public
 * @example
 * <NotConnected>
 *   <p>The client is not connected. It might be connecting or disconnected.</p>
 * </NotConnected>
 */
exports.NotConnected = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {
    render() {
        const renderProps = {
            connectionState: this.props.connectionState
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        if (this.props.connectionState !== 'connected') {
            return render ? render(renderProps) : this.props.children;
        }
        return null;
    }
});
/**
 * @description
 * The `<Connected />` component renders its children when the SimpleWebRTC client is connected and ready.
 * @public
 * @example
 * <Connecting>
 *   <p>The client is connecting and not yet ready.</p>
 * </Connecting>
 */
exports.Connecting = createConnectionStateComponent('connecting');
/**
 * @description
 * The `<Connecting />` component renders its children when the SimpleWebRTC client is starting and attempting to connect to the service.
 * @public
 * @example
 * <Connected>
 *   <p>The client is now ready.</p>
 * </Connected>
 */
exports.Connected = createConnectionStateComponent('connected');
/**
 * @description
 * The `<Disconnected />` component renders its children when the SimpleWebRTC client has lost connection with the service.
 * @public
 * @example
 * <Disconnected>
 *   <p>The client lost access to the signaling service.</p>
 * </Disconnected>
 */
exports.Disconnected = createConnectionStateComponent('disconnected');
/**
 * @description
 * The `<Failed />` component renders its children when the SimpleWebRTC client failed to receive its service configuration and can not continue.
 * @public
 * @example
 * <Failed>
 *   <p>There was an error initializing the client. The service might not be available.</p>
 * </Failed>
 */
exports.Failed = createConnectionStateComponent('failed');
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Provider);

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
class DeviceList extends React.Component {
    componentDidMount() {
        this.props.listenForDevices();
        this.props.fetchDevices();
    }
    componentWillUnmount() {
        Actions.stopListeningForDevices();
    }
    render() {
        const renderProps = {
            audioInput: this.props.audioInput,
            audioOutput: this.props.audioOutput,
            cameraPermissionDenied: this.props.cameraPermissionDenied,
            cameraPermissionGranted: this.props.cameraPermissionGranted,
            devices: this.props.devices,
            hasAudioOutput: this.props.hasAudioOutput,
            hasCamera: this.props.hasCamera,
            hasMicrophone: this.props.hasMicrophone,
            microphonePermissionDenied: this.props.microphonePermissionDenied,
            microphonePermissionGranted: this.props.microphonePermissionGranted,
            requestingCameraCapture: this.props.requestingCameraCapture,
            requestingCapture: this.props.requestingCapture,
            requestingMicrophoneCapture: this.props.requestingMicrophoneCapture,
            videoInput: this.props.videoInput
        };
        let render = this.props.render;
        if (!render && typeof this.props.children === 'function') {
            render = this.props.children;
        }
        return render ? render(renderProps) : this.props.children;
    }
}
function mapStateToProps(state, props) {
    const devices = Selectors_1.getDevices(state).filter(device => {
        return ((!props.audioInput && !props.videoInput && !props.audioOutput) ||
            (device.kind === 'audioinput' && props.audioInput) ||
            (device.kind === 'videoinput' && props.videoInput) ||
            (device.kind === 'audiooutput' && props.audioOutput));
    });
    const permissions = Selectors_1.getDevicePermissions(state);
    return {
        ...props,
        devices,
        ...permissions
    };
}
function mapDispatchToProps(dispatch) {
    return {
        fetchDevices: () => dispatch(Actions.fetchDevices()),
        listenForDevices: () => dispatch(Actions.listenForDevices())
    };
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DeviceList);

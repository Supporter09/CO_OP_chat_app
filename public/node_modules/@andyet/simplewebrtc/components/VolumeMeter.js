"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
/**
 * @description
 * The volume meter component can be used to display the audio output volume of a track. Useful for showing that a user's microphone is live and sensitive enough to detect speech.
 *
 * @public
 *
 * @example
 * <VolumeMeter
 * media={getMediaTrack(store, 'some-media-id')}
 * render={({ volume, speaking }) => {
 *   // Render volume as a series of segments
 *
 *   const buckets = Math.abs(Math.max(volume / 10));
 *   let i = 0;
 *
 *   const segments = [];
 *   for (let i = 0; i < buckets; i++) {
 *       segments.push(<div key={i} className='volume-meter-segment' />);
 *   }
 *
 *   return (
 *     <div className={speaking ? 'volume-meter-speaking' : 'volume-meter-notspeaking'}>
 *       {segments}
 *     </div>
 *   );
 * }} />
 */
class VolumeMeter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: -Infinity
        };
        this.onVolume = (volume) => {
            this.setState({
                volume
            });
        };
    }
    componentDidMount() {
        if (!this.props.media || !this.props.media.hark) {
            return;
        }
        this.attachHark();
    }
    componentWillUnmount() {
        this.detachHark();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.media !== this.props.media) {
            this.detachHark();
            this.attachHark();
        }
    }
    attachHark() {
        this.setState({
            volume: -Infinity
        });
        if (this.props.media) {
            this.hark = this.props.media.hark;
        }
        if (this.hark) {
            this.hark.on('volume', this.onVolume);
        }
    }
    detachHark() {
        if (this.hark) {
            this.hark.removeListener('volume', this.onVolume);
            this.hark = undefined;
        }
        this.setState({
            volume: -Infinity
        });
    }
    render() {
        const media = this.props.media;
        const noInputTimeout = this.props.noInputTimeout || 7000;
        const noInput = media &&
            (media.externalDisabled ||
                (!!media.inputLost && Date.now() - media.inputLost > noInputTimeout));
        const renderProps = {
            loaded: media && !!media.loaded && !!media.inputDetected,
            media,
            muted: media && media.localDisabled,
            noInput,
            speaking: media && media.speaking,
            speakingWhileMuted: media && media.localDisabled && media.speaking,
            volume: media.externalDisabled ? -Infinity : this.state.volume
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
exports.default = VolumeMeter;

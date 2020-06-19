import { ConnectionStateChange, CreateSignalingClient, QueueTelemetry, ReceivedConfig, SetVideoResolutionTiers, ShutdownSignalingClient, TelemetryEvent, TelemetrySuccess } from '../actions';
import { APIConfig, VideoResolutionTier } from '../Definitions';
import { SignalingClient } from '../signaling';
export interface ServiceState {
    connectionAttempts: number;
    connectionState: string;
    signalingClient?: SignalingClient;
    config: APIConfig;
    configUrl: string;
    queuedTelemetry: TelemetryEvent[];
    token: string;
    videoResolutionTiers: VideoResolutionTier[];
}
export default function (state: ServiceState | undefined, action: ConnectionStateChange | CreateSignalingClient | QueueTelemetry | ReceivedConfig | SetVideoResolutionTiers | ShutdownSignalingClient | TelemetrySuccess): ServiceState;

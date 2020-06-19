import { User } from '../Definitions';
import { ServiceState } from './API';
import { CallState } from './Calls';
import { ChatState } from './Chats';
import { PeerConnectionState } from './Connections';
import { DeviceState } from './Devices';
import { MediaState } from './Media';
import { PeerState } from './Peers';
import { RoomState } from './Rooms';
export interface State {
    simplewebrtc: {
        api: ServiceState;
        calls: CallState;
        chats: ChatState;
        connections: PeerConnectionState;
        devices: DeviceState;
        media: MediaState;
        peers: PeerState;
        rooms: RoomState;
        user: User;
    };
}
declare const reducer: import("redux").Reducer<import("redux").CombinedState<{
    api: ServiceState;
    calls: CallState;
    chats: ChatState;
    connections: PeerConnectionState;
    devices: DeviceState;
    media: MediaState;
    peers: PeerState;
    rooms: RoomState;
    user: User;
}>, import("redux").AnyAction>;
export default reducer;

import { AsyncPriorityQueue } from 'async';
import { ThunkDispatch } from 'redux-thunk';
import { Jingle } from 'stanza';
import { Media } from '../Definitions';
import { State } from '../reducers';
import SignalingClient from './Client';
import SFU from './SFU';
export default class Mesh {
    sfu: SFU;
    jingle: Jingle.SessionManager;
    dispatch: ThunkDispatch<State, void, any>;
    getState: () => State;
    updateQueue: AsyncPriorityQueue<string | number>;
    constructor(client: SignalingClient);
    updateICEServers(): void;
    updateConnections(reason?: string): Promise<void>;
    plugin(): () => void;
    notifyPeers(media: Media, action: string): void;
}

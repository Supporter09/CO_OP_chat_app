import { AddMedia, LeaveCall, MediaUpdated, RemoveMedia, UpdateConnection } from '../actions';
import { Media } from '../Definitions';
export interface MediaState {
    [key: string]: Media;
}
export default function (state: MediaState | undefined, action: AddMedia | RemoveMedia | MediaUpdated | LeaveCall | UpdateConnection): MediaState;

import * as Actions from '../actions';
import { User } from '../Definitions';
export default function (state: User | undefined, action: Actions.SetUserPreference | Actions.ReceivedConfig | Actions.Devices): User;

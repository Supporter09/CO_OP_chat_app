import * as React from 'react';
import { Peer } from '../Definitions';
export interface ChatComposerProps {
    room: string;
    className?: string;
    composers?: Peer[];
    render?: (props: ChatComposerRenderProps) => React.ReactNode;
    children?: React.ReactNode | ((props: ChatComposerRenderProps) => React.ReactNode);
}
export interface ChatComposerRenderProps {
    composers: Peer[];
}
/**
 * @description
 *
 * @public
 *
 */
declare class ChatComposers extends React.Component<ChatComposerProps> {
    render(): JSX.Element;
}
export default ChatComposers;

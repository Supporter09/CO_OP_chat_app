import * as React from 'react';
/**
 * @description
 *  The `<StayDownContainer/>` component forces its view to stay pinned to the bottom of its scrollable area, unless the user scrolls away from the bottom.
 *
 * It's especially suited for chat UIs so that new messages are displayed at the bottom but still kept visible unless the user has scrolled back to read past messages.
 *
 * @public
 *
 */
export default class StayDownContainer extends React.Component<any, any> {
    private staydown;
    render(): JSX.Element;
}

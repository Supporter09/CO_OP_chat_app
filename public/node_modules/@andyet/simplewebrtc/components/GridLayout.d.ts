import * as React from 'react';
interface VideoLayoutProps<T> {
    id?: string;
    className?: string;
    items: T[];
    renderCell: (item: T) => React.ReactNode | undefined;
}
/**
 * @description
 *
 * @public
 *
 */
export default class GridLayout<T> extends React.Component<VideoLayoutProps<T>> {
    render(): JSX.Element;
}
export {};

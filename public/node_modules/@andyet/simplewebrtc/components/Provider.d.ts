import * as React from 'react';
import { Media, VideoResolutionTier } from '../Definitions';
interface ProviderDispatchProps {
    connect?: () => void;
    disconnect?: () => void;
    removeAllMedia?: () => void;
    setDefaultValues?: () => void;
}
interface ProviderStateProps {
    connectionState?: string;
    isSupportedBrowser?: boolean;
    localMedia?: Media[];
}
export interface ProviderProps extends ProviderStateProps, ProviderDispatchProps {
    configUrl: string;
    userData?: string;
    videoResolutionTiers?: VideoResolutionTier[];
    displayName?: string;
    desiredMedia?: 'video' | 'audio' | 'none';
    render?: (props: ProviderStateProps) => React.ReactNode;
    children?: React.ReactNode | ((props: ProviderStateProps) => React.ReactNode);
}
/**
 * @description
 *
 * @public
 *
 */
declare class Provider extends React.Component<ProviderProps, any> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): {} | null | undefined;
}
/**
 * @description
 *
 * @public
 * @example
 * <NotSupported>
 *   <p>This browser does not support WebRTC media features.</p>
 * </NotSupported>
 */
export declare const NotSupported: import("react-redux").ConnectedComponent<{
    new (props: Readonly<ProviderStateProps>): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<ProviderStateProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ProviderStateProps>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<ProviderStateProps>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ProviderStateProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ProviderStateProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): void;
    };
    new (props: ProviderStateProps, context?: any): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<ProviderStateProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ProviderStateProps>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<ProviderStateProps>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ProviderStateProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ProviderStateProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
}, Pick<React.ClassAttributes<{
    render(): {} | null | undefined;
    context: any;
    setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<ProviderStateProps> & Readonly<{
        children?: React.ReactNode;
    }>;
    state: Readonly<any>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<ProviderStateProps>, prevState: Readonly<any>): any;
    componentDidUpdate?(prevProps: Readonly<ProviderStateProps>, prevState: Readonly<any>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<ProviderStateProps>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ProviderStateProps>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<ProviderStateProps>, nextState: Readonly<any>, nextContext: any): void;
}> & ProviderStateProps, "key" | "ref"> & ProviderProps>;
/**
 * @description
 *
 * @public
 * @example
 * <NotConnected>
 *   <p>The client is not connected. It might be connecting or disconnected.</p>
 * </NotConnected>
 */
export declare const NotConnected: import("react-redux").ConnectedComponent<{
    new (props: Readonly<ProviderProps>): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<ProviderProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ProviderProps>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<ProviderProps>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ProviderProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ProviderProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): void;
    };
    new (props: ProviderProps, context?: any): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<ProviderProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ProviderProps>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<ProviderProps>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ProviderProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ProviderProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
}, Pick<React.ClassAttributes<{
    render(): {} | null | undefined;
    context: any;
    setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<ProviderProps> & Readonly<{
        children?: React.ReactNode;
    }>;
    state: Readonly<any>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<ProviderProps>, prevState: Readonly<any>): any;
    componentDidUpdate?(prevProps: Readonly<ProviderProps>, prevState: Readonly<any>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<ProviderProps>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ProviderProps>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<ProviderProps>, nextState: Readonly<any>, nextContext: any): void;
}> & ProviderProps, "displayName" | "key" | "ref" | "children" | "render" | "configUrl" | "userData" | "videoResolutionTiers" | "desiredMedia"> & ProviderProps>;
/**
 * @description
 * The `<Connected />` component renders its children when the SimpleWebRTC client is connected and ready.
 * @public
 * @example
 * <Connecting>
 *   <p>The client is connecting and not yet ready.</p>
 * </Connecting>
 */
export declare const Connecting: import("react-redux").ConnectedComponent<{
    new (props: Readonly<Partial<ProviderProps>>): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Partial<ProviderProps>, context?: any): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
}, Pick<React.ClassAttributes<{
    render(): {} | null | undefined;
    context: any;
    setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
        children?: React.ReactNode;
    }>;
    state: Readonly<{}>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
    componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
}> & Partial<ProviderProps>, "disconnect" | "connect" | "displayName" | "key" | "ref" | "children" | "render" | "configUrl" | "userData" | "videoResolutionTiers" | "desiredMedia" | "removeAllMedia" | "setDefaultValues">>;
/**
 * @description
 * The `<Connecting />` component renders its children when the SimpleWebRTC client is starting and attempting to connect to the service.
 * @public
 * @example
 * <Connected>
 *   <p>The client is now ready.</p>
 * </Connected>
 */
export declare const Connected: import("react-redux").ConnectedComponent<{
    new (props: Readonly<Partial<ProviderProps>>): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Partial<ProviderProps>, context?: any): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
}, Pick<React.ClassAttributes<{
    render(): {} | null | undefined;
    context: any;
    setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
        children?: React.ReactNode;
    }>;
    state: Readonly<{}>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
    componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
}> & Partial<ProviderProps>, "disconnect" | "connect" | "displayName" | "key" | "ref" | "children" | "render" | "configUrl" | "userData" | "videoResolutionTiers" | "desiredMedia" | "removeAllMedia" | "setDefaultValues">>;
/**
 * @description
 * The `<Disconnected />` component renders its children when the SimpleWebRTC client has lost connection with the service.
 * @public
 * @example
 * <Disconnected>
 *   <p>The client lost access to the signaling service.</p>
 * </Disconnected>
 */
export declare const Disconnected: import("react-redux").ConnectedComponent<{
    new (props: Readonly<Partial<ProviderProps>>): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Partial<ProviderProps>, context?: any): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
}, Pick<React.ClassAttributes<{
    render(): {} | null | undefined;
    context: any;
    setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
        children?: React.ReactNode;
    }>;
    state: Readonly<{}>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
    componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
}> & Partial<ProviderProps>, "disconnect" | "connect" | "displayName" | "key" | "ref" | "children" | "render" | "configUrl" | "userData" | "videoResolutionTiers" | "desiredMedia" | "removeAllMedia" | "setDefaultValues">>;
/**
 * @description
 * The `<Failed />` component renders its children when the SimpleWebRTC client failed to receive its service configuration and can not continue.
 * @public
 * @example
 * <Failed>
 *   <p>There was an error initializing the client. The service might not be available.</p>
 * </Failed>
 */
export declare const Failed: import("react-redux").ConnectedComponent<{
    new (props: Readonly<Partial<ProviderProps>>): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: Partial<ProviderProps>, context?: any): {
        render(): {} | null | undefined;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
}, Pick<React.ClassAttributes<{
    render(): {} | null | undefined;
    context: any;
    setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Partial<ProviderProps>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
    forceUpdate(callback?: (() => void) | undefined): void;
    readonly props: Readonly<Partial<ProviderProps>> & Readonly<{
        children?: React.ReactNode;
    }>;
    state: Readonly<{}>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>): any;
    componentDidUpdate?(prevProps: Readonly<Partial<ProviderProps>>, prevState: Readonly<{}>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Partial<ProviderProps>>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<Partial<ProviderProps>>, nextState: Readonly<{}>, nextContext: any): void;
}> & Partial<ProviderProps>, "disconnect" | "connect" | "displayName" | "key" | "ref" | "children" | "render" | "configUrl" | "userData" | "videoResolutionTiers" | "desiredMedia" | "removeAllMedia" | "setDefaultValues">>;
declare const _default: import("react-redux").ConnectedComponent<typeof Provider, Pick<React.ClassAttributes<Provider> & ProviderProps, "displayName" | "key" | "ref" | "children" | "render" | "configUrl" | "userData" | "videoResolutionTiers" | "desiredMedia"> & ProviderProps>;
export default _default;

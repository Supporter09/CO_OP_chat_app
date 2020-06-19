export interface LoadedMediaInfo {
    loaded: boolean;
    height?: number;
    width?: number;
}
export declare function waitForMediaLoaded(track: MediaStreamTrack, stream: MediaStream, timeout?: number): Promise<LoadedMediaInfo>;
export declare function waitForAudioLoaded(stream: MediaStream): Promise<LoadedMediaInfo>;
export declare function waitForVideoLoaded(stream: MediaStream, timeout: number): Promise<LoadedMediaInfo>;

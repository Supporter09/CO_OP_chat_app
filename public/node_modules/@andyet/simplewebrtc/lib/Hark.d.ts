/// <reference types="node" />
import { EventEmitter } from 'events';
export interface HarkOptions {
    smoothing: number;
    interval: number;
    threshold: number;
    play: boolean;
    history: number;
    frequencyRange: [number, number];
    fftSize: number;
}
export declare function setGlobalVoiceActivityThreshold(threshold: number): void;
export default class Hark extends EventEmitter {
    private static audioContext;
    private running;
    private smoothing;
    private interval;
    private threshold?;
    private history;
    private speakingHistory;
    private frequencyRange;
    private fftSize;
    private fftBins;
    private frequencySpread;
    private sourceNode;
    private speaking;
    private previousVolume;
    private stoppedReceivingVolume?;
    private analyser;
    private intervalTimer;
    constructor(audioStream: MediaStream, opts?: Partial<HarkOptions>);
    stop(): void;
    private start;
}

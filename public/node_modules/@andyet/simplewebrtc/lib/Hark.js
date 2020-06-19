"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const AudioContext = window.AudioContext || window.webkitAudioContext;
// Check if the volume of fundamental freq is > threshold
function frequencyAnalyser(analyser, range, freqSpread, bins) {
    analyser.getFloatFrequencyData(bins);
    const start = range[0];
    const end = range[1];
    const startIndex = Math.round(start / freqSpread);
    const endIndex = Math.round(end / freqSpread);
    const fundamentalFreqArray = bins.slice(startIndex, endIndex);
    const avgVol = fundamentalFreqArray.reduce((a, b) => a + b, 0) / fundamentalFreqArray.length;
    return avgVol;
}
const defaultSettings = {
    threshold: -65
};
function setGlobalVoiceActivityThreshold(threshold) {
    defaultSettings.threshold = threshold;
}
exports.setGlobalVoiceActivityThreshold = setGlobalVoiceActivityThreshold;
class Hark extends events_1.EventEmitter {
    constructor(audioStream, opts = {}) {
        super();
        this.running = false;
        this.smoothing = 0.1;
        this.interval = 50;
        this.history = 10;
        this.speakingHistory = [];
        this.frequencyRange = [85, 300];
        this.fftSize = 512;
        this.speaking = false;
        this.previousVolume = -Infinity;
        this.stoppedReceivingVolume = Date.now();
        if (!AudioContext) {
            return;
        }
        if (!Hark.audioContext) {
            Hark.audioContext = new AudioContext();
            // workaround for Chrome 66+ suspending the audio context due to autoplay policy changes.
            // See https://bugs.chromium.org/p/chromium/issues/detail?id=835767
            const check = () => {
                if (!(this.running && Hark.audioContext) || Hark.audioContext.state !== 'suspended') {
                    return;
                }
                setTimeout(check, 1000);
                Hark.audioContext.resume();
            };
            setTimeout(check, 1000);
        }
        this.smoothing = opts.smoothing || 0.1;
        this.interval = opts.interval || 50;
        this.threshold = opts.threshold;
        this.history = opts.history || 10;
        this.frequencyRange = opts.frequencyRange || [85, 300]; // [85, 255] is the typical fundamental freq range for human speech
        this.fftSize = opts.fftSize || 512;
        if (isSafari) {
            this.threshold = -20;
        }
        this.analyser = Hark.audioContext.createAnalyser();
        this.analyser.fftSize = this.fftSize;
        this.analyser.smoothingTimeConstant = this.smoothing;
        this.fftBins = new Float32Array(this.analyser.frequencyBinCount);
        this.frequencySpread = Hark.audioContext.sampleRate / this.analyser.fftSize;
        this.sourceNode = Hark.audioContext.createMediaStreamSource(audioStream);
        this.sourceNode.connect(this.analyser);
        this.start();
    }
    stop() {
        this.running = false;
        this.emit('volume', -100, this.threshold || defaultSettings.threshold);
        if (this.speaking) {
            this.speaking = false;
            this.emit('stopped-speaking');
        }
        clearInterval(this.intervalTimer);
        this.analyser.disconnect();
        this.sourceNode.disconnect();
        return;
    }
    start() {
        this.running = true;
        this.speakingHistory = new Array(this.history).fill(0);
        this.intervalTimer = setInterval(() => {
            if (!this.running) {
                return;
            }
            const threshold = this.threshold || defaultSettings.threshold;
            const avgVolume = frequencyAnalyser(this.analyser, this.frequencyRange, this.frequencySpread, this.fftBins);
            const aboveThreshold = avgVolume > threshold ? 1 : 0;
            let stoppedReceivingVolume;
            if (!isFinite(avgVolume) || avgVolume <= -100) {
                if (isFinite(this.previousVolume) && this.previousVolume > -100) {
                    stoppedReceivingVolume = Date.now();
                }
                else {
                    stoppedReceivingVolume = this.stoppedReceivingVolume;
                }
            }
            this.emit('volume', avgVolume, threshold);
            if (stoppedReceivingVolume !== this.stoppedReceivingVolume) {
                if (stoppedReceivingVolume) {
                    this.emit('stopped-receiving-volume', stoppedReceivingVolume);
                }
                else {
                    this.emit('started-receiving-volume');
                }
            }
            this.previousVolume = avgVolume;
            this.stoppedReceivingVolume = stoppedReceivingVolume;
            let timesAboveThreshold = 0;
            for (const hist of this.speakingHistory) {
                timesAboveThreshold += hist;
            }
            if (aboveThreshold && !this.speaking) {
                if (timesAboveThreshold >= 5) {
                    this.speaking = true;
                    this.emit('speaking');
                }
            }
            else if (!aboveThreshold && this.speaking) {
                if (timesAboveThreshold === 0) {
                    this.speaking = false;
                    this.emit('stopped-speaking');
                }
            }
            this.speakingHistory.shift();
            this.speakingHistory.push(aboveThreshold);
        }, this.interval);
    }
}
exports.default = Hark;

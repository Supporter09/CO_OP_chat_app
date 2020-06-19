"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function waitForMediaLoaded(track, stream, timeout = 500) {
    if (track.kind === 'audio') {
        return waitForAudioLoaded(stream);
    }
    if (track.kind === 'video') {
        return waitForVideoLoaded(stream, timeout);
    }
    return Promise.resolve({
        loaded: false
    });
}
exports.waitForMediaLoaded = waitForMediaLoaded;
async function waitForAudioLoaded(stream) {
    return new Promise(resolve => {
        let player = document.createElement('audio');
        const onLoaded = () => {
            if (player) {
                player.pause();
                player.removeEventListener('oncanplay', onLoaded);
                player.srcObject = null;
                player = undefined;
                resolve({
                    loaded: true
                });
            }
        };
        player.muted = true;
        player.autoplay = true;
        player.oncanplay = onLoaded;
        player.srcObject = stream;
    });
}
exports.waitForAudioLoaded = waitForAudioLoaded;
async function waitForVideoLoaded(stream, timeout) {
    return new Promise(resolve => {
        let player = document.createElement('video');
        const onLoaded = () => {
            if (player) {
                const height = player.videoHeight;
                const width = player.videoWidth;
                player.pause();
                player.removeEventListener('oncanplay', onLoaded);
                player.srcObject = null;
                player = undefined;
                resolve({
                    height,
                    loaded: true,
                    width
                });
            }
        };
        player.setAttribute('playsinline', 'playsinline');
        player.muted = true;
        player.autoplay = true;
        player.oncanplay = onLoaded;
        player.srcObject = stream;
        setTimeout(onLoaded, timeout);
    });
}
exports.waitForVideoLoaded = waitForVideoLoaded;

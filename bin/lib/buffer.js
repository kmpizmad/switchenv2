"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBuffer = exports.toArrayBuffer = void 0;
function toArrayBuffer(buffer) {
    var arrBuffer = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(arrBuffer);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return arrBuffer;
}
exports.toArrayBuffer = toArrayBuffer;
function toBuffer(arrBuffer) {
    var buffer = Buffer.alloc(arrBuffer.byteLength);
    var view = new Uint8Array(arrBuffer);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}
exports.toBuffer = toBuffer;

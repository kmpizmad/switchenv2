export function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  const arrBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrBuffer;
}

export function toBuffer(arrBuffer: ArrayBuffer): Buffer {
  const buffer = Buffer.alloc(arrBuffer.byteLength);
  const view = new Uint8Array(arrBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

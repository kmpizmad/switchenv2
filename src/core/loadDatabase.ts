import { Credentials, CryptoEngine, Kdbx, ProtectedValue } from 'kdbxweb';
import { readFileSync } from 'fs';
import { toArrayBuffer } from '../lib/buffer';
import { argon2 } from '../lib/argon2';
import { IOptions } from '../types';

export function loadDatabase(
  options: IOptions,
  callback: (db: Kdbx) => void
): void {
  const data: ArrayBuffer = toArrayBuffer(readFileSync(options.source));
  const key: ArrayBuffer = toArrayBuffer(readFileSync(options.key));

  const credentials: Credentials = new Credentials(
    ProtectedValue.fromBinary(new ArrayBuffer(0)),
    key
  );

  CryptoEngine.argon2 = argon2;

  Kdbx.load(data, credentials)
    .then(db => callback(db))
    .catch(e => console.log(e));
}

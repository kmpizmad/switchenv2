import { hash } from 'argon2';
import { toBuffer } from './buffer';

export async function argon2(
  password: ArrayBuffer,
  salt: ArrayBuffer,
  memory: number,
  _: number,
  length: number,
  parallelism: number,
  type: number,
  version: number
): Promise<ArrayBuffer> {
  const v: ArrayBuffer = await hash(toBuffer(password), {
    salt: toBuffer(salt),
    memoryCost: memory,
    hashLength: length,
    parallelism,
    type: type as 0 | 1 | 2,
    version,
    raw: true,
  });

  return Promise.resolve(v);
}

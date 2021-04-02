#!/usr/bin/env node

import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import { Credentials, CryptoEngine, Kdbx, ProtectedValue } from 'kdbxweb';
import { argon2 } from './lib/argon2';
import { toArrayBuffer } from './lib/buffer';
import { FileNotFoundException } from './lib/exceptions';
import { switchenv2 } from './switchenv2';
import { IOptions } from './types';

const { version, description } = require('../package.json');
const program = new Command('switchenv2');

program.description(description);
program.version(version, '-v, --version');

program
  .allowExcessArguments(false)
  .allowUnknownOption(false)
  .requiredOption('-s, --source <path>', 'path of the .kdbx file')
  .requiredOption('-k, --key <path>', 'path of the .keyx file')
  .requiredOption('-g, --group <uuid>', 'uuid of the group')
  .option('-e, --entry <uuid>', 'uuid of the entry')
  .option('-p, --path <path>', 'path of the .env file')
  .action((options: IOptions) => {
    try {
      if (!existsSync(options.source) || !existsSync(options.key))
        throw new FileNotFoundException(
          `${options.source || options.key} not found`
        );

      const data: ArrayBuffer = toArrayBuffer(readFileSync(options.source));
      const key: ArrayBuffer = toArrayBuffer(readFileSync(options.key));

      const credentials: Credentials = new Credentials(
        ProtectedValue.fromBinary(new ArrayBuffer(0)),
        key
      );

      CryptoEngine.argon2 = argon2;

      Kdbx.load(data, credentials)
        .then(switchenv2(process.env.NODE_ENV || 'default', options))
        .catch(e => console.log(e));
    } catch (ex) {
      console.log(ex.message);
    }
  });

program.parse();

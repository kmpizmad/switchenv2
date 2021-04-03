[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

- [Switchenv2](#switchenv2)
- [About](#about)
- [Install](#install)
  - [Globally](#globally)
  - [Locally](#locally)
- [Options](#options)
- [API](#api)
  - [Usage](#usage)
  - [New entry](#new-entry)
- [License](#license)

# Switchenv2

See changes [here](https://github.com/kmpizmad/switchenv2/blob/main/CHANGELOG.md).

# About

This project was created based on [switchenv](https://www.npmjs.com/package/switchenv)

I've always liked the idea of using only 1 `.env` file for every environment instead of naming them `.env.development`, `.env.production` etc..

The reason why I sought a package like this is to be able to setup my project faster and deploy easier. With [cross-env](https://www.npmjs.com/package/cross-env), I can set my `NODE_ENV` before I run a script, eg.: `yarn test: cross-env NODE_ENV=test jest`, but this script does not load my `.env.test` into action, and so I have to manually craft some shenanigans to get it to work as I wish.

Finally, I found [switchenv](https://www.npmjs.com/package/switchenv) and tried it out, but the problem was that the author didn't follow the changes of [kdbxweb](https://www.npmjs.com/package/kdbxweb), so the package broke.

The latest change was the use of [KDBX 4](https://www.npmjs.com/package/kdbxweb#kdbx4) which required Argon2 hash, since KeePass 2.35, that you had to implement if you used [kdbxweb](https://www.npmjs.com/package/kdbxweb)

# Install

## Globally

`npm i -g switchenv2` or `yarn global add switchenv2`

## Locally

`npm i -D switchenv2` or `yarn add -D switchenv2`

# Options

| name         | value                            | required | comment                                                              |
| ------------ | -------------------------------- | -------- | -------------------------------------------------------------------- |
| -s, --source | Path to .kdbx file               | Yes      | -                                                                    |
| -k, --key    | Path to .key/.keyx file          | Yes      | -                                                                    |
| -g, --group  | Uuid of the entry's parent group | Yes      | -                                                                    |
| -e, --entry  | Uuid of the entry                | No       | Use this if you have multiple entries with the same title            |
| -p, --path   | Path to .env file                | No       | Use this if the .env file is not located in the root of your porject |

# API

## Usage

1. Create a .kdbx file which you can do using [KeePass 2](https://keepass.info/download.html) or [keeweb](https://app.keeweb.info/)
2. Generate a .key or .keyx file
3. Create a script in `package.json`:
   - `"switchenv2": "switchenv2 --source path/to/database.kdbx --key path/to/keyfile.keyx --group parent group uuid of the entry"`
4. Link it to the `start` script:
   - `"start": "cross-env NODE_ENV=development yarn switchenv2 && node index.js"`

**You have to set NODE_ENV before executing `switchenv2` otherwise it will try to load the 'default' entry which may not exist yet!**

## New entry

When you create a new entry:

- the `title` field should be the name of the targeted environment,
- the `notes` section should contain the environment variables as you would do in a `.env` file

# License

MIT License

Copyright (c) 2021 Viktor Nagy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[travis-badge]: https://travis-ci.com/kmpizmad/switchenv2.svg
[travis-url]: https://travis-ci.com/kmpizmad/switchenv2
[coveralls-badge]: https://coveralls.io/repos/github/kmpizmad/switchenv2/badge.svg
[coveralls-url]: https://coveralls.io/github/kmpizmad/switchenv2?branch=main

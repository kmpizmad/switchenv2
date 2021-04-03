#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs_1 = require("fs");
var loadDatabase_1 = require("./core/loadDatabase");
var exceptions_1 = require("./lib/exceptions");
var switchenv2_1 = require("./switchenv2");
var _a = require('../package.json'), version = _a.version, description = _a.description;
var program = new commander_1.Command('switchenv2');
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
    .action(function (options) {
    try {
        if (!fs_1.existsSync(options.source) || !fs_1.existsSync(options.key))
            throw new exceptions_1.FileNotFoundException((options.source || options.key) + " not found");
        loadDatabase_1.loadDatabase(options, switchenv2_1.switchenv2(process.env.NODE_ENV || 'default', options));
    }
    catch (ex) {
        console.log(ex.message);
    }
});
program.parse();

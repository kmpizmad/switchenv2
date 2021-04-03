"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDatabase = void 0;
var kdbxweb_1 = require("kdbxweb");
var fs_1 = require("fs");
var buffer_1 = require("../lib/buffer");
var argon2_1 = require("../lib/argon2");
function loadDatabase(options, callback) {
    var data = buffer_1.toArrayBuffer(fs_1.readFileSync(options.source));
    var key = buffer_1.toArrayBuffer(fs_1.readFileSync(options.key));
    var credentials = new kdbxweb_1.Credentials(kdbxweb_1.ProtectedValue.fromBinary(new ArrayBuffer(0)), key);
    kdbxweb_1.CryptoEngine.argon2 = argon2_1.argon2;
    kdbxweb_1.Kdbx.load(data, credentials)
        .then(function (db) { return callback(db); })
        .catch(function (e) { return console.log(e); });
}
exports.loadDatabase = loadDatabase;

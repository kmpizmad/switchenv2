"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var chalk_1 = require("chalk");
var Exception = (function () {
    function Exception(message) {
        this._name = this.constructor.name;
        this._message = message;
    }
    Object.defineProperty(Exception.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Exception.prototype, "message", {
        get: function () {
            return chalk_1.red(this._name) + ':' + " " + this._message;
        },
        set: function (value) {
            this._message = value;
        },
        enumerable: false,
        configurable: true
    });
    return Exception;
}());
exports.Exception = Exception;

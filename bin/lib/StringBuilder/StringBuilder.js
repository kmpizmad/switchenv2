"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
var os_1 = require("os");
var exceptions_1 = require("../exceptions");
var StringBuilder = (function () {
    function StringBuilder(str) {
        this._str = str || '';
    }
    Object.defineProperty(StringBuilder.prototype, "value", {
        get: function () {
            return this._str;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StringBuilder.prototype, "length", {
        get: function () {
            return this._str.length;
        },
        enumerable: false,
        configurable: true
    });
    StringBuilder.prototype.toString = function () {
        return this._str;
    };
    StringBuilder.prototype.append = function (value, startIndex) {
        var value_ = value.toString();
        var index_ = startIndex !== null && startIndex !== void 0 ? startIndex : this._str.length;
        if (index_ < 0 || index_ > this._str.length) {
            var ex = new exceptions_1.ArgumentOutOfRangeException('\'startIndex\' was out of range.');
            ex.message = ex.message + "\n" + {
                argumentValue: startIndex,
            };
            throw ex;
        }
        if (index_ == this._str.length) {
            this._str += value_;
        }
        else {
            this.insert(value_, index_);
        }
        return this;
    };
    StringBuilder.prototype.appendLine = function () {
        this._str += os_1.EOL;
        return this;
    };
    StringBuilder.prototype.insert = function (value, index, count) {
        var value_ = value.toString();
        var count_ = count || 1;
        if (index < 0 || index > this._str.length) {
            var ex = new exceptions_1.ArgumentOutOfRangeException('\'index\' was out of range.');
            ex.message = ex.message + "\n" + {
                argumentValue: index,
            };
            throw ex;
        }
        for (var c = 0; c < count_; c++) {
            var newStr = this.__insert(value_, index);
            this._str = newStr;
        }
        return this;
    };
    StringBuilder.prototype.replace = function (oldValue, newValue, startIndex, count) {
        var oldValue_ = new RegExp(oldValue.toString(), 'g');
        var newValue_ = newValue.toString();
        var index_ = startIndex || 0;
        var count_ = count || this._str.length;
        if (index_ < 0 || index_ > this._str.length) {
            var ex = new exceptions_1.ArgumentOutOfRangeException('\'startIndex\' was out of range.');
            ex.message = ex.message + "\n" + {
                argumentValue: index_,
            };
            throw ex;
        }
        var subStr_ = this._str
            .substring(index_, count_)
            .replace(oldValue_, newValue_);
        this.remove(index_, count_).insert(subStr_, index_);
        return this;
    };
    StringBuilder.prototype.remove = function (startIndex, count) {
        var count_ = count || this._str.length;
        var strArr_ = this._str.split('');
        if (startIndex < 0 || startIndex > this._str.length) {
            var ex = new exceptions_1.ArgumentOutOfRangeException('\'startIndex\' was out of range.');
            ex.message = ex.message + "\n" + {
                argumentValue: startIndex,
            };
            throw ex;
        }
        for (var i = startIndex; i < count_; i++) {
            if (strArr_[i] == undefined) {
                throw new exceptions_1.IndexOutOfRangeException('');
            }
            strArr_[i] = '';
        }
        this._str = strArr_.join('');
        return this;
    };
    StringBuilder.prototype.clear = function () {
        this._str = '';
        return this;
    };
    StringBuilder.prototype.__insert = function (value, index) {
        var str_ = '';
        for (var i = 0; i < index; i++) {
            str_ += this._str[i];
        }
        str_ += value;
        for (var i = index; i < this._str.length; i++) {
            str_ += this._str[i];
        }
        return str_;
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;

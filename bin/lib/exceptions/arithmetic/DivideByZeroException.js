"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivideByZeroException = void 0;
var ArithmeticException_1 = require("./ArithmeticException");
var DivideByZeroException = (function (_super) {
    __extends(DivideByZeroException, _super);
    function DivideByZeroException(message) {
        return _super.call(this, message) || this;
    }
    return DivideByZeroException;
}(ArithmeticException_1.ArithmeticException));
exports.DivideByZeroException = DivideByZeroException;

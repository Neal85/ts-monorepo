"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("@ts-monorepo/core"));
var info = function () {
    console.log('TS Mono feature fn');
    console.log('Core name:', core_1.default.name);
};
exports.default = {
    info: info
};
//# sourceMappingURL=index.js.map
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CancellationToken_1 = __importDefault(require("./CancellationToken"));
exports.CancellationToken = CancellationToken_1.default;
var PromisePolling_1 = __importDefault(require("./PromisePolling"));
exports.PromisePolling = PromisePolling_1.default;
__export(require("./strategies"));

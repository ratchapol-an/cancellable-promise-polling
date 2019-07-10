"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FixIntervalStrategy_1 = __importDefault(require("./strategies/FixIntervalStrategy"));
exports.defaultOptions = {
    retries: 5,
    shouldContinue: function (_) { return true; },
    strategy: new FixIntervalStrategy_1.default(),
};

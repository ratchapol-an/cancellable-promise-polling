"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PollingOptions_1 = require("./PollingOptions");
var PromisePolling = /** @class */ (function () {
    function PromisePolling() {
    }
    PromisePolling.prototype.start = function (taskFn, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (typeof taskFn !== 'function') {
            throw new Error('A task function is not provided');
        }
        Object.assign(options, PollingOptions_1.defaultOptions);
        options.name = options.name || "Polling-" + PromisePolling.pollingInstanceNo++;
        this.debug("Creating a cancellable promise polling instance \"" + options.name + "\" with retries=" + options.retries);
        var strategy = options.strategy;
        this.debug("(" + options.name + ") Using strategy \"" + strategy.name + "\".");
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var retriesRemaining, poll;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retriesRemaining = options.retries;
                        poll = function () { return __awaiter(_this, void 0, void 0, function () {
                            var retry, value, error_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (options.cancellationToken && options.cancellationToken.isCancellationRequested) {
                                            reject('cancelled');
                                            this.debug("(" + options.name + ") is cancelled.");
                                        }
                                        retry = function () {
                                            if (--retriesRemaining) {
                                                _this.debug("(" + options.name + ") shouldContinue returned true. but maximum retries reached. Rejecting.");
                                                reject('maximum retries reached');
                                            }
                                            _this.debug("(" + options.name + ") shouldContinue returned true. Retrying (" + retriesRemaining + " remaining).");
                                            var nextInterval = options.strategy.getNextInterval(options.retries - retriesRemaining);
                                            _this.debug("(" + options.name + ") Waiting " + nextInterval + "ms to try again.");
                                            setTimeout(poll, nextInterval);
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, taskFn()];
                                    case 2:
                                        value = _a.sent();
                                        if (options.shouldContinue(value, undefined)) {
                                            retry();
                                        }
                                        else {
                                            resolve(value);
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        this.debug("(" + options.name + ") Poll failed.");
                                        if (options.shouldContinue(undefined, error_1)) {
                                            retry();
                                        }
                                        else {
                                            reject(error_1);
                                        }
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, poll()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PromisePolling.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (PromisePolling.debugMode) {
            // tslint:disable-next-line: no-console
            console.debug(message, optionalParams);
        }
    };
    PromisePolling.debugMode = false;
    PromisePolling.pollingInstanceNo = 0;
    return PromisePolling;
}());
exports.default = PromisePolling;

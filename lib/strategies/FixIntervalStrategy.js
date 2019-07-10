"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FixIntervalStrategy = /** @class */ (function () {
    function FixIntervalStrategy(interval) {
        if (interval === void 0) { interval = 1000; }
        this.interval = interval;
        this.name = 'fix-interval';
    }
    FixIntervalStrategy.prototype.getNextInterval = function (_) {
        return this.interval;
    };
    return FixIntervalStrategy;
}());
exports.default = FixIntervalStrategy;

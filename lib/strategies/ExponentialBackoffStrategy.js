"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExponentialBackoffStrategy = /** @class */ (function () {
    function ExponentialBackoffStrategy(min, max) {
        if (min === void 0) { min = 1000; }
        if (max === void 0) { max = 3000; }
        this.min = min;
        this.max = max;
        this.name = 'exponential-backoff';
    }
    ExponentialBackoffStrategy.prototype.getNextInterval = function (count) {
        return Math.min(this.max, Math.round(Math.random() * (Math.pow(2, count) * 1000 - this.min) + this.min));
    };
    return ExponentialBackoffStrategy;
}());
exports.default = ExponentialBackoffStrategy;

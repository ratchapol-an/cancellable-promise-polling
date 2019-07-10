"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinearBackoffStrategy = /** @class */ (function () {
    function LinearBackoffStrategy(start, increment) {
        if (start === void 0) { start = 1000; }
        if (increment === void 0) { increment = 1000; }
        this.start = start;
        this.increment = increment;
        this.name = 'linear-backoff';
    }
    LinearBackoffStrategy.prototype.getNextInterval = function (count) {
        return this.start + this.increment * count;
    };
    return LinearBackoffStrategy;
}());
exports.default = LinearBackoffStrategy;

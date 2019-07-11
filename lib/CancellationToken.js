"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CancellationToken = /** @class */ (function () {
    function CancellationToken(abortController) {
        if (abortController === void 0) { abortController = new AbortController(); }
        this.abortController = abortController;
        this.cancellationRequested = false;
    }
    CancellationToken.prototype.cancel = function () {
        this.cancellationRequested = true;
        this.abortController.abort();
    };
    Object.defineProperty(CancellationToken.prototype, "isCancellationRequested", {
        get: function () {
            return this.cancellationRequested;
        },
        enumerable: true,
        configurable: true
    });
    return CancellationToken;
}());
exports.default = CancellationToken;

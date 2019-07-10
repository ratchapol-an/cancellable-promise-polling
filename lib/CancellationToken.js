"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CancellationToken = /** @class */ (function () {
    function CancellationToken(isCancellationRequested, abortController) {
        if (isCancellationRequested === void 0) { isCancellationRequested = false; }
        if (abortController === void 0) { abortController = new AbortController(); }
        this.isCancellationRequested = isCancellationRequested;
        this.abortController = abortController;
    }
    CancellationToken.prototype.cancel = function () {
        this.isCancellationRequested = true;
        this.abortController.abort();
    };
    return CancellationToken;
}());
exports.default = CancellationToken;

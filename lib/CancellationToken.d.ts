export default class CancellationToken {
    abortController: AbortController;
    private cancellationRequested;
    constructor(abortController?: AbortController);
    cancel(): void;
    readonly isCancellationRequested: boolean;
}

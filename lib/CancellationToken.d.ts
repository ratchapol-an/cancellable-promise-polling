export default class CancellationToken {
    isCancellationRequested: boolean;
    abortController: AbortController;
    constructor(isCancellationRequested?: boolean, abortController?: AbortController);
    cancel(): void;
}

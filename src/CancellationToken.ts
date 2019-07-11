export default class CancellationToken {
	private cancellationRequested = false;
	constructor(public abortController = new AbortController()) { }

	public cancel() {
		this.cancellationRequested = true;
		this.abortController.abort();
	}

	public get isCancellationRequested(): boolean {
		return this.cancellationRequested;
	}
}

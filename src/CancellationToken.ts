export default class CancellationToken {
	constructor(public isCancellationRequested = false, public abortController = new AbortController()) {}

	public cancel() {
		this.isCancellationRequested = true;
		this.abortController.abort();
	}
}

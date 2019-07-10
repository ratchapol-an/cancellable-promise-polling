import Strategy from './Strategy';

export default class LinearBackoffStrategy implements Strategy {
	public name = 'linear-backoff';

	constructor(private start = 1000, private increment = 1000) {}

	public getNextInterval(count: number) {
		return this.start + this.increment * count;
	}
}

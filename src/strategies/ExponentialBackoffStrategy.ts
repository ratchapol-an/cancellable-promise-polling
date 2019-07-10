import Strategy from './Strategy';

export default class ExponentialBackoffStrategy implements Strategy {
	public name = 'exponential-backoff';

	constructor(private min = 1000, private max = 3000) {}

	public getNextInterval(count: number) {
		return Math.min(this.max, Math.round(Math.random() * (Math.pow(2, count) * 1000 - this.min) + this.min));
	}
}

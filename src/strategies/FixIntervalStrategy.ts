import Strategy from './Strategy';

export default class FixIntervalStrategy implements Strategy {
	public name = 'fix-interval';

	constructor(private interval = 1000) {}

	public getNextInterval(_: number) {
		return this.interval;
	}
}

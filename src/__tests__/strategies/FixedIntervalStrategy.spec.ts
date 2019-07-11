import { FixIntervalStrategy } from '../../';

describe('fixed interval strategy', () => {
	it('polls on a fixed interval', () => {
		const expectedIntervals = [1000, 1000, 1000, 1000, 1000];
		const fixedIntervalStrategy = new FixIntervalStrategy(1000);
		expectedIntervals.forEach((interval, index) => {
			expect(fixedIntervalStrategy.getNextInterval(index)).toEqual(interval);
		});
	});
});

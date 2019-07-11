import { ExponentialBackoffStrategy } from '../../';

describe('exponential backoff polling strategy', () => {
	it('uses exponential backoff with jitter', () => {
		const randoms = [0.2, 0.4, 0.6, 0.8, 0.9];
		const expectedIntervals = [1000, 1400, 2800, 6600, 10000];
		jest.spyOn(Math, 'random').mockImplementation(() => randoms.shift() as number);

		const exponentialBackoffStrategy = new ExponentialBackoffStrategy(1000, 10000);

		expectedIntervals.forEach((interval, index) => {
			expect(exponentialBackoffStrategy.getNextInterval(index)).toEqual(interval);
		});
	});
});

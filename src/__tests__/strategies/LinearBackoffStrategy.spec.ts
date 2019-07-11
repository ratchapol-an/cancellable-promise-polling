import { LinearBackoffStrategy } from '../../';

describe('linear backoff strategy', () => {
    it('increases the interval linearly', () => {
        const expectedIntervals = [1000, 1500, 2000, 2500, 3000];
        const linearBackoffStrategy = new LinearBackoffStrategy(1000, 500);
        expectedIntervals.forEach((interval, index) => {
            expect(linearBackoffStrategy.getNextInterval(index)).toEqual(interval);
        });
    });
});

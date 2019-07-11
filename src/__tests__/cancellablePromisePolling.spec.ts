import { CancellationToken, setDebugMode, startPolling } from '../index';
import { FixIntervalStrategy } from '../strategies';

describe('Promise Polling', () => {
	beforeAll(() => {
		setDebugMode(true);
	});

	it('returns a promise.', async () => {
		const taskFn = () => Promise.resolve(true);
		const promise = startPolling(taskFn, { shouldContinue: () => false, retries: 1 });
		expect(promise.then).toBeDefined();
		expect(typeof promise.then).toBe('function');
		await expect(promise).resolves.toBe(true);
	});

	it('polls until shouldContinue function returns false then resolve the promise.', async () => {
		const taskFn = jest.fn<Promise<string>, []>();
		taskFn
			.mockResolvedValueOnce('keep-polling')
			.mockResolvedValueOnce('keep-polling')
			.mockResolvedValue('done');

		const startTime = Date.now();
		const promise = startPolling(taskFn, {
			shouldContinue: resolvedValue => resolvedValue !== 'done',
			strategy: new FixIntervalStrategy(200),
		});
		await expect(promise).resolves.toBe('done');
		const endTime = Date.now();
		expect(endTime - startTime).toBeLessThan(500);
		expect(taskFn).toHaveBeenCalledTimes(3);
	});

	it('rejects the promise when reaches the maximum retries and shouldContinue function still returns true.', async () => {
		const taskFn = jest.fn<Promise<string>, []>();
		taskFn.mockResolvedValue('keep-polling');

		const startTime = Date.now();
		const promise = startPolling(taskFn, {
			retries: 3,
			shouldContinue: resolvedValue => resolvedValue !== 'done',
			strategy: new FixIntervalStrategy(200),
		});
		await expect(promise).rejects.toBe('maximum retries reached');
		const endTime = Date.now();
		expect(endTime - startTime).toBeLessThan(500);
		expect(taskFn).toHaveBeenCalledTimes(3);
	});

	it('rejects the promise when the cancellation is requested.', async () => {
		const taskFn = jest.fn<Promise<string>, []>();
		taskFn.mockResolvedValue('keep-polling');
		const abortController = new AbortController();
		const spyAbort = jest.spyOn(abortController, 'abort');
		const cancellationToken = new CancellationToken(abortController);

		const promise = startPolling(taskFn, {
			cancellationToken,
			retries: 5,
			shouldContinue: resolvedValue => resolvedValue !== 'done',
			strategy: new FixIntervalStrategy(1000),
		});
		cancellationToken.cancel();
		await expect(promise).rejects.toBe('cancelled');
		expect(spyAbort).toHaveBeenCalledTimes(1);
		expect(taskFn).toHaveBeenCalledTimes(1);
	});
});

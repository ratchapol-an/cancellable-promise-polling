import PollingOptions, { defaultOptions } from './PollingOptions';

let pollingInstanceNo = 0;
let debugMode = false;
const setDebugMode = (isDebug: boolean) => (debugMode = isDebug);
const debug = (message: string, ...optionalParams: any[]) => {
	if (debugMode) {
		// tslint:disable-next-line: no-console
		console.debug(message, ...optionalParams);
	}
};

const startPolling = <RS, RJ>(taskFn: () => Promise<RS>, options: PollingOptions<RS, RJ> = {}): Promise<RS> => {
	if (typeof taskFn !== 'function') {
		throw new Error('A task function is not provided');
	}

	options = { ...defaultOptions, ...options };

	options.name = options.name || `Polling-${pollingInstanceNo++}`;
	debug(`Creating a cancellable promise polling instance "${options.name}" with retries=${options.retries}`);

	const strategy = options.strategy!;
	debug(`(${options.name}) Using strategy "${strategy.name}".`);

	return new Promise(async (resolve, reject) => {
		let retriesRemaining = options.retries!;

		const poll = async () => {
			if (options.cancellationToken && options.cancellationToken.isCancellationRequested) {
				reject('cancelled');
				debug(`(${options.name}) is cancelled.`);
				return;
			}

			const retry = () => {
				if (!--retriesRemaining) {
					debug(`(${options.name}) shouldContinue returned true. but maximum retries reached. Rejecting.`);
					reject('maximum retries reached');
					return;
				} else {
					debug(`(${options.name}) shouldContinue returned true. Retrying (${retriesRemaining} remaining).`);
					const nextInterval = options.strategy!.getNextInterval(options.retries! - retriesRemaining);
					debug(`(${options.name}) Waiting ${nextInterval}ms to try again.`);

					setTimeout(poll, nextInterval);
				}
			};

			try {
				const value = await taskFn();
				if (options.shouldContinue!(value, undefined)) {
					retry();
				} else {
					resolve(value);
					return;
				}
			} catch (error) {
				debug(`(${options.name}) Poll failed.`);
				if (options.shouldContinue!(undefined, error)) {
					retry();
					return;
				} else {
					reject(error);
					return;
				}
			}
		};

		await poll();
	});
};

export { startPolling, setDebugMode };

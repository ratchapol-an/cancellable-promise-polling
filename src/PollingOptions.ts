import CancellationToken from './CancellationToken';
import FixIntervalStrategy from './strategies/FixIntervalStrategy';
import Strategy from './strategies/Strategy';

export default interface PollingOptions<RS, RJ = any> {
	name?: string;
	shouldContinue?: (resolvedValue: RS | undefined, rejected: RJ | undefined) => boolean;
	strategy?: Strategy;
	retries?: number;
	cancellationToken?: CancellationToken;
}

export const defaultOptions: PollingOptions<any, any> = {
	retries: 5,
	shouldContinue: _ => true,
	strategy: new FixIntervalStrategy(),
};

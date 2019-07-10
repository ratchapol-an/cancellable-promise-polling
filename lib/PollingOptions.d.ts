import CancellationToken from './CancellationToken';
import Strategy from './strategies/Strategy';
export default interface PollingOptions<RS, RJ = any> {
    name?: string;
    shouldContinue?: (resolvedValue: RS | undefined, rejected: RJ | undefined) => boolean;
    strategy?: Strategy;
    retries?: number;
    cancellationToken?: CancellationToken;
}
export declare const defaultOptions: PollingOptions<any, any>;

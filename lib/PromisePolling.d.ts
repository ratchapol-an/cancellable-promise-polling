import PollingOptions from './PollingOptions';
export default class PromisePolling {
    static debugMode: boolean;
    private static pollingInstanceNo;
    start<RS, RJ>(taskFn: () => Promise<RS>, options?: PollingOptions<RS, RJ>): Promise<unknown>;
    private debug;
}

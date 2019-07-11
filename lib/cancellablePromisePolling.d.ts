import PollingOptions from './PollingOptions';
declare const setDebugMode: (isDebug: boolean) => boolean;
declare const startPolling: <RS, RJ>(taskFn: () => Promise<RS>, options?: PollingOptions<RS, RJ>) => Promise<RS>;
export { startPolling, setDebugMode };

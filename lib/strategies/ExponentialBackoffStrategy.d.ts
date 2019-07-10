import Strategy from './Strategy';
export default class ExponentialBackoffStrategy implements Strategy {
    private min;
    private max;
    name: string;
    constructor(min?: number, max?: number);
    getNextInterval(count: number): number;
}

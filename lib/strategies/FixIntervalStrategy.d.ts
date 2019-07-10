import Strategy from './Strategy';
export default class FixIntervalStrategy implements Strategy {
    private interval;
    name: string;
    constructor(interval?: number);
    getNextInterval(_: number): number;
}

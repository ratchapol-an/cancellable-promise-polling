import Strategy from './Strategy';
export default class LinearBackoffStrategy implements Strategy {
    private start;
    private increment;
    name: string;
    constructor(start?: number, increment?: number);
    getNextInterval(count: number): number;
}

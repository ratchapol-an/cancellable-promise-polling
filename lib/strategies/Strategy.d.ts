export default interface Strategy {
    name: string;
    getNextInterval: (count: number) => number;
}

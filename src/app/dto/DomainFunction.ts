export class DomainFunction {
    public leftClosedInterval: boolean;
    public rightClosedInterval: boolean;
    public beginningInterval: number;
    public endInterval: number;

    constructor(leftClosedInterval: boolean, beginningInterval: number, endInterval: number, rightClosedInterval: boolean) {
        this.leftClosedInterval = leftClosedInterval;
        this.beginningInterval = beginningInterval;
        this.endInterval = endInterval;
        this.rightClosedInterval = rightClosedInterval;
    }
}

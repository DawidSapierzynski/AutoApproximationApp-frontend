import { DomainFunction } from './DomainFunction';

export class MathematicalFunction {
    public polynomial;
    public domainFunction: DomainFunction;

    constructor(polynomial, domainFunction: DomainFunction) {
        this.polynomial = polynomial;
        this.domainFunction = domainFunction;
    }
}

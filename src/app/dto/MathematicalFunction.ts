import { DomainFunction } from './DomainFunction';
import { PolynomialDTO } from './PolynomialDTO';

export class MathematicalFunctionDTO {
    public polynomialDTO: PolynomialDTO;
    public domainFunction: DomainFunction;

    constructor(polynomialDTO: PolynomialDTO, domainFunction: DomainFunction) {
        this.polynomialDTO = polynomialDTO;
        this.domainFunction = domainFunction;
    }
}

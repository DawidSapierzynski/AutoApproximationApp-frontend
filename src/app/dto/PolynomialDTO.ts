export class PolynomialDTO {
    public coefficients: number[];
    public degree: number;

    constructor(coefficients: number[], degree: number) {
        this.coefficients = coefficients;
        this.degree = degree;
    }
}

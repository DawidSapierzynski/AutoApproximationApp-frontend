import { MathematicalFunctionDTO } from './MathematicalFunction';
import { Method } from './Method';

export class ApproximationView {
    public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
    public method: Method;

    constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], method: Method) {
        this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
        this.method = method;
    }
}

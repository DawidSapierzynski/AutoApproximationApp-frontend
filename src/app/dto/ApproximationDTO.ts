import { PointXY } from './PointXY';
import { MathematicalFunctionDTO } from './MathematicalFunction';

export class ApproximationDTO {
    public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
    public points: PointXY[];

    constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], points: PointXY[]) {
        this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
        this.points = points;
    }
}

import { PointXY } from './PointXY';
import { MathematicalFunction } from './MathematicalFunction';

export class ApproximationDTO {
    public mathematicalFunction: MathematicalFunction[];
    public points: PointXY[];

    constructor(mathematicalFunction: MathematicalFunction[], points: PointXY[]) {
        this.mathematicalFunction = mathematicalFunction;
        this.points = points;
    }
}

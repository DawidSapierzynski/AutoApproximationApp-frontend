import { ChosenMethodDTO } from './ChosenMethodDTO';
import { PointXY } from './PointXY';

export class ApproximationForm {
    public chosenMethod: ChosenMethodDTO;
    public points: PointXY[];

    constructor(chosenMethod: ChosenMethodDTO, points: PointXY[]) {
        this.chosenMethod = chosenMethod;
        this.points = points;
    }
}

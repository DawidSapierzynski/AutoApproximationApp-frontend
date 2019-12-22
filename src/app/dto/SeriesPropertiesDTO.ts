import { PointXY } from './PointXY';

export class SeriesPropertiesDTO {
    public id: number;
    public size: number;
    public fastVariationPolynomial: number;
    public fastVariationTrigonometric: number;
    public fastVariation: boolean;
    public variance: number;
    public standardDeviation: number;
    public precision: number;
    public dateCreate: Date;
    public points: Array<PointXY>;
    public artefacts: Array<PointXY>;
    public deleted: boolean;

    constructor(
        id: number, size: number, fastVariationPolynomial: number, fastVariationTrigonometric: number, fastVariation: boolean,
        variance: number, standardDeviation: number, precision: number, dateCreate: Date, points: Array<PointXY>, deleted: boolean,
        artefacts: Array<PointXY>
    ) {
        this.id = id;
        this.size = size;
        this.fastVariationPolynomial = fastVariationPolynomial;
        this.fastVariationTrigonometric = fastVariationTrigonometric;
        this.fastVariation = fastVariation;
        this.variance = variance;
        this.standardDeviation = standardDeviation;
        this.precision = precision;
        this.dateCreate = dateCreate;
        this.points = points;
        this.deleted = deleted;
        this.artefacts = artefacts;
    }
}

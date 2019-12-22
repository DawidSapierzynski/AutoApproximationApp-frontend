import {PointXY} from './PointXY';

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
  public equidistant: boolean;

  constructor() {
  }

}

import {PointXY} from './PointXY';

export class DataSeriesFileDTO {
  public id: number;
  public userId: number;
  public size: number;
  public fastVariationPolynomial: number;
  public fastVariationTrigonometric: number;
  public fastVariation: boolean;
  public variance: number;
  public standardDeviation: number;
  public equidistant: boolean;
  public name: string;
  public hashName: string;
  public dateSent: Date;
  public deleted: boolean;
  public points: Array<PointXY>;
  public artefacts: Array<PointXY>;

  constructor() {
  }
}

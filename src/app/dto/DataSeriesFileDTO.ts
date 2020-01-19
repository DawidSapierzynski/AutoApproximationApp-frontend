import {PointXY} from './PointXY';

export class DataSeriesFileDTO {
  public id: number;
  public userId: number;
  public size: number;
  public errorPolynomial: number;
  public errorTrigonometric: number;
  public periodicity: boolean;
  public variance: number;
  public standardDeviation: number;
  public name: string;
  public hashName: string;
  public dateSent: Date;
  public deleted: boolean;
  public points: Array<PointXY>;
  public artefacts: Array<PointXY>;

  constructor() {
  }
}

import {DataSeriesFileDTO} from './DataSeriesFileDTO';

export class ApproximationPropertiesDTO {
  public id: number;
  public userId: number;
  public dataSeriesFileId: number;
  public dataSeriesFileDTO: DataSeriesFileDTO;
  public precision: number;
  public dateCreate: Date;
  public deleted: boolean;

  constructor() {
  }

}

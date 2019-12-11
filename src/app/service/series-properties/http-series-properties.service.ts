import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSeriesFileDTO } from '../../dto/DataSeriesFileDTO';
import { SeriesPropertiesDTO } from '../../dto/SeriesPropertiesDTO';
import { PointXY } from '../../dto/PointXY';
import { ChosenMethodDTO } from '../../dto/ChosenMethodDTO';
import { ApproximationDTO } from '../../dto/ApproximationDTO';
import { ApproximationForm } from '../../dto/ApproximationForm';


@Injectable({
  providedIn: 'root'
})
export class HttpSeriesPropertiesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public uploadDataSeriesFile(dataSeriesFile: File) {
    const endpoint = '/api/dataSeriesFile';

    const uploadData = new FormData();
    uploadData.append('dataSeriesFile', dataSeriesFile);

    return this.httpClient.post<DataSeriesFileDTO>(endpoint, uploadData);
  }

  public postSeriesProperties(precision: number, dataSeriesId: number) {
    const endpoint = '/api/seriesProperties';
    const uploadData = new FormData();

    uploadData.append('dataSeriesFileId', JSON.stringify(dataSeriesId));
    uploadData.append('precision', JSON.stringify(precision));

    return this.httpClient.post<SeriesPropertiesDTO>(endpoint, uploadData);
  }

  public selectMethods(seriesProperties: SeriesPropertiesDTO) {
    const endpoint = '/api/chooseMethod';
    return this.httpClient.post<ChosenMethodDTO[]>(endpoint, seriesProperties);
  }

  public doApproximations(chosenMethod: ChosenMethodDTO, points: PointXY[]) {
    const endpoint = '/api/doApproximations';

    const approximationForm = new ApproximationForm(chosenMethod, points);

    return this.httpClient.post<ApproximationDTO>(endpoint, approximationForm);
  }

  public getSeriesPropertiesAdmin() {
    const endpoint = '/api/seriesProperties/all';

    return this.httpClient.get<SeriesPropertiesDTO[]>(endpoint);
  }

  public getSeriesPropertiesUser() {
    const endpoint = '/api/seriesProperties';

    return this.httpClient.get<SeriesPropertiesDTO[]>(endpoint);
  }

  public getSeriesProperties(id: string) {
    const endpoint = '/api/seriesProperties/' + id;

    return this.httpClient.get<SeriesPropertiesDTO>(endpoint);
  }
}

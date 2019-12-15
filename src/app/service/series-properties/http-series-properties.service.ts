import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSeriesFileDTO } from '../../dto/DataSeriesFileDTO';
import { SeriesPropertiesDTO } from '../../dto/SeriesPropertiesDTO';
import { PointXY } from '../../dto/PointXY';
import { ChosenMethodDTO } from '../../dto/ChosenMethodDTO';
import { ApproximationDTO } from '../../dto/ApproximationDTO';
import { ApproximationForm } from '../../dto/ApproximationForm';
import {ResponseMessage} from '../../dto/ResponseMessage';
import { SERIES_PROPERTIES_URL } from '../url.constants';


@Injectable({
  providedIn: 'root'
})
export class HttpSeriesPropertiesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public postSeriesProperties(precision: number, dataSeriesId: number) {
    const uploadData = new FormData();

    uploadData.append('dataSeriesFileId', JSON.stringify(dataSeriesId));
    uploadData.append('precision', JSON.stringify(precision));

    return this.httpClient.post<SeriesPropertiesDTO>(SERIES_PROPERTIES_URL.BASE, uploadData);
  }

  public selectMethods(seriesProperties: SeriesPropertiesDTO) {
    return this.httpClient.post<ChosenMethodDTO[]>(SERIES_PROPERTIES_URL.CHOOSE_METHOD, seriesProperties);
  }

  public doApproximations(chosenMethod: ChosenMethodDTO, points: PointXY[]) {
    const approximationForm = new ApproximationForm(chosenMethod, points);

    return this.httpClient.post<ApproximationDTO>(SERIES_PROPERTIES_URL.DO_APPROXIMATIONS, approximationForm);
  }

  public getSeriesPropertiesAdmin() {
    return this.httpClient.get<SeriesPropertiesDTO[]>(SERIES_PROPERTIES_URL.GET_ADMIN);
  }

  public getSeriesPropertiesUser() {
    return this.httpClient.get<SeriesPropertiesDTO[]>(SERIES_PROPERTIES_URL.BASE);
  }

  public getSeriesProperties(id: string) {
    const endpoint = SERIES_PROPERTIES_URL.GET_ONE + id;

    return this.httpClient.get<SeriesPropertiesDTO>(endpoint);
  }

  public deleteSeriesProperties(seriesPropertiesId: number) {
    const endpoint = SERIES_PROPERTIES_URL.DELETE + seriesPropertiesId;

    return this.httpClient.delete<ResponseMessage>(endpoint);
  }
}

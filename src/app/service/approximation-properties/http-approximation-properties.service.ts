import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApproximationPropertiesDTO } from '../../dto/ApproximationPropertiesDTO';
import { PointXY } from '../../dto/PointXY';
import { ChosenMethodDTO } from '../../dto/ChosenMethodDTO';
import { ApproximationDTO } from '../../dto/ApproximationDTO';
import { ApproximationForm } from '../../dto/ApproximationForm';
import {ResponseMessage} from '../../dto/ResponseMessage';
import { APPROXIMATION_PROPERTIES_URL } from '../url.constants';


@Injectable({
  providedIn: 'root'
})
export class HttpApproximationPropertiesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public postApproximationProperties(precision: number, dataSeriesId: number) {
    const uploadData = new FormData();

    uploadData.append('dataSeriesFileId', JSON.stringify(dataSeriesId));
    uploadData.append('precision', JSON.stringify(precision));

    return this.httpClient.post<ApproximationPropertiesDTO>(APPROXIMATION_PROPERTIES_URL.BASE, uploadData);
  }

  public selectMethods(approximationPropertiesDTO: ApproximationPropertiesDTO) {
    return this.httpClient.post<ChosenMethodDTO[]>(APPROXIMATION_PROPERTIES_URL.CHOOSE_METHOD, approximationPropertiesDTO);
  }

  public doApproximations(chosenMethod: ChosenMethodDTO, points: PointXY[]) {
    const approximationForm = new ApproximationForm(chosenMethod, points);

    return this.httpClient.post<ApproximationDTO>(APPROXIMATION_PROPERTIES_URL.DO_APPROXIMATIONS, approximationForm);
  }

  public getApproximationPropertiesAdmin() {
    return this.httpClient.get<ApproximationPropertiesDTO[]>(APPROXIMATION_PROPERTIES_URL.GET_ADMIN);
  }

  public getApproximationPropertiesUser() {
    return this.httpClient.get<ApproximationPropertiesDTO[]>(APPROXIMATION_PROPERTIES_URL.BASE);
  }

  public getApproximationProperties(id: string) {
    const endpoint = APPROXIMATION_PROPERTIES_URL.GET_ONE + id;

    return this.httpClient.get<ApproximationPropertiesDTO>(endpoint);
  }

  public deleteApproximationProperties(approximationPropertiesId: number) {
    const endpoint = APPROXIMATION_PROPERTIES_URL.DELETE + approximationPropertiesId;

    return this.httpClient.delete<ResponseMessage>(endpoint);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSeriesFileDTO } from '../../dto/DataSeriesFileDTO';
import { ResponseMessage } from 'src/app/dto/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class HttpDataSeriesFileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDataSeriesFilesUser() {
    const endpoint = '/api/dataSeriesFile';

    return this.httpClient.get<DataSeriesFileDTO[]>(endpoint);
  }

  public getDataSeriesFilesAdmin() {
    const endpoint = '/api/dataSeriesFile/all';

    return this.httpClient.get<DataSeriesFileDTO[]>(endpoint);
  }

  public deleteDataSeriesFilesAdmin(id: number) {
    const endpoint = '/api/dataSeriesFile/' + id;

    return this.httpClient.delete<ResponseMessage>(endpoint);
  }

}

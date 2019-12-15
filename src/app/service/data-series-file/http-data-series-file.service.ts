import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSeriesFileDTO } from '../../dto/DataSeriesFileDTO';
import { ResponseMessage } from 'src/app/dto/ResponseMessage';
import { DATA_SERIES_FILE_URL } from '../url.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpDataSeriesFileService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDataSeriesFilesUser() {
    return this.httpClient.get<DataSeriesFileDTO[]>(DATA_SERIES_FILE_URL.GET_USER);
  }

  public getDataSeriesFilesAdmin() {
    return this.httpClient.get<DataSeriesFileDTO[]>(DATA_SERIES_FILE_URL.GET_ADMIN);
  }

  public deleteDataSeriesFilesAdmin(id: number) {
    const endpoint = DATA_SERIES_FILE_URL.DELETE + id;

    return this.httpClient.delete<ResponseMessage>(endpoint);
  }

  public uploadDataSeriesFile(dataSeriesFile: File) {
    const uploadData = new FormData();
    uploadData.append('dataSeriesFile', dataSeriesFile);

    return this.httpClient.post<DataSeriesFileDTO>(DATA_SERIES_FILE_URL.UPLOAD, uploadData);
  }

}

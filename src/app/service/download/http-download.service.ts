import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MathematicalFunctionDTO} from 'src/app/dto/MathematicalFunction';
import {DOWNLOAD_URL} from '../url.constants';
import {GenerateDataSeriesForm} from '../../dto/GenerateDataSeriesForm';


@Injectable({
  providedIn: 'root'
})
export class HttpDownloadService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public downloadApproximation(mathematicalFunctionDTOs: MathematicalFunctionDTO[]) {
    return this.httpClient.put(DOWNLOAD_URL.APPROXIMATION, mathematicalFunctionDTOs, {responseType: 'blob'});
  }

  public generateDataSeries(generateDataSeriesForm: GenerateDataSeriesForm) {
    return this.httpClient.put(DOWNLOAD_URL.GENERATE_DATA_SERIES, generateDataSeriesForm, {responseType: 'blob'});
  }
}

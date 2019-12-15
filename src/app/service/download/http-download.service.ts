import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, } from '@angular/common/http';
import { MathematicalFunctionDTO } from 'src/app/dto/MathematicalFunction';
import { DOWNLOAD_URL } from '../url.constants';


@Injectable({
  providedIn: 'root'
})
export class HttpDownloadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public downloadApproximation(mathematicalFunctionDTOs: MathematicalFunctionDTO[]) {
    return this.httpClient.put(DOWNLOAD_URL.APPROXIMATION, mathematicalFunctionDTOs, { responseType: 'blob' });
  }
}

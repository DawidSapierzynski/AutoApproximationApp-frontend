import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, } from '@angular/common/http';
import { MathematicalFunctionDTO } from 'src/app/dto/MathematicalFunction';


@Injectable({
  providedIn: 'root'
})
export class HttpDownloadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public downloadApproximation(mathematicalFunctionDTOs: MathematicalFunctionDTO[]) {
    const endpoint = '/api/download/approximation';

    return this.httpClient.put(endpoint, mathematicalFunctionDTOs, { responseType: 'blob' });
  }
}

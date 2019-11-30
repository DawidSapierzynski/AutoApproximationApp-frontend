import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

export class SeriesProperties {
  constructor(
    public size: number,
    public fastVariationPolynomial: number,
    public fastVariationTrigonometric: number,
    public fastVariation: boolean,
    public variance: number,
    public standardDeviation: number,
    public precision: number,
    public points: Array<PointXY>,
  ) { }
}

export class PointXY {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export enum Method {
  NEWTONINTERPOLATION = 'NEWTON INTERPOLATION',
  TRIGONOMETRICINTERPOLATION = 'TRIGONOMETRIC INTERPOLATION',
  SPLINEINTERPOLATION = '3rd ORDER SPLINE INTERPOLATION',
  POLYNOMIALAPPROXIMATION = 'POLYNOMIAL APPROXIMATION',
  TRIGONOMETRICAPPROXIMATION = 'TRIGONOMETRIC APPROXIMATION'
}

export class ChosenMethod {
  public method: Method;
  public degree: number;
  public isUsed: boolean;
  constructor(method: Method, degree: number) {
    this.method = method;
    this.degree = degree;
    this.isUsed = false;
  }
}

export class DomainFunction {
  public leftClosedInterval: boolean;
  public rightClosedInterval: boolean;
  public beginningInterval: number;
  public endInterval: number;

  constructor(leftClosedInterval: boolean, beginningInterval: number, endInterval: number, rightClosedInterval: boolean) {
    this.leftClosedInterval = leftClosedInterval;
    this.beginningInterval = beginningInterval;
    this.endInterval = endInterval;
    this.rightClosedInterval = rightClosedInterval;
  }
}

export class MathematicalFunction {
  public polynomial;
  public domainFunction: DomainFunction;
  constructor(polynomial, domainFunction: DomainFunction) {
    this.polynomial = polynomial;
    this.domainFunction = domainFunction;
  }
}

export class ApproximationForm {
  public mathematicalFunction: MathematicalFunction;
  public points: PointXY[];
  constructor(mathematicalFunction: MathematicalFunction, points: PointXY[]) {
    this.mathematicalFunction = mathematicalFunction;
    this.points = points;
  }
}

export class ApproximationDataForm {
  public chosenMethod: ChosenMethod;
  public points: PointXY[];

  constructor(chosenMethod: ChosenMethod, points: PointXY[]) {
    this.chosenMethod = chosenMethod;
    this.points = points;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpSeriesPropertiesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public uploadDataSeriesFile(dataSeriesFile: File) {
    const endpoint = '/seriesDataFile';
    const httpUploadOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };

    const uploadData = new FormData();
    uploadData.append('dataSeriesFile', dataSeriesFile);

    return this.httpClient.post<number>(endpoint, dataSeriesFile, httpUploadOptions);
  }

  public calculateSeriesProperties(precision, dataSeriesId) {
    const endpoint = '/calculateProperties';
    const httpUploadOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };

    const uploadData = new FormData();
    uploadData.append('seriesdataId', dataSeriesId);
    uploadData.append('precision', precision);

    return this.httpClient.post<SeriesProperties>(endpoint, uploadData);
  }

  public selectMethods(seriesProperties: SeriesProperties) {
    const endpoint = '/chooseMethod';
    return this.httpClient.post<ChosenMethod[]>(endpoint, seriesProperties);
  }

  public doApproximations(chosenMethod: ChosenMethod, points: PointXY[]) {
    const endpoint = '/doApproximations';
    const approximationDataForm = new ApproximationDataForm(chosenMethod, points);
    return this.httpClient.post<ApproximationForm>(endpoint, approximationDataForm);
  }
}

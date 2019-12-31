import {Method} from './Method';

export class ChosenMethodDTO {
  public method: Method;
  public degree: number;
  public isUsed: boolean;

  constructor(method: Method, degree: number) {
    this.method = method;
    this.degree = degree;
    this.isUsed = false;
  }
}

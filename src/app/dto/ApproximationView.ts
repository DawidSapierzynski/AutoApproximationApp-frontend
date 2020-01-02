import {MathematicalFunctionDTO} from './MathematicalFunction';
import {Method} from './Method';

export class ApproximationView {
  public mathematicalFunctionDTOs: MathematicalFunctionDTO[];
  public method: Method;
  public absoluteError: number;

  constructor(mathematicalFunctionDTOs: MathematicalFunctionDTO[], method: Method, absoluteError: number) {
    this.mathematicalFunctionDTOs = mathematicalFunctionDTOs;
    this.method = method;
    this.absoluteError = absoluteError;
  }
}

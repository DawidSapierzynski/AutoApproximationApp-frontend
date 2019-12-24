import {Component, OnInit} from '@angular/core';
import {MathematicalFunctionDTO} from '../dto/MathematicalFunction';
import {DomainFunction} from '../dto/DomainFunction';
import {PolynomialDTO} from '../dto/PolynomialDTO';
import {HttpDownloadService} from '../service/download/http-download.service';
import {saveAs as importedSaveAs} from 'file-saver';
import {GenerateDataSeriesForm} from '../dto/GenerateDataSeriesForm';
import {MessageService} from '../service/message/message.service';
import {Message, MessageType} from '../message/Message';

@Component({
  selector: 'app-data-series-generator',
  templateUrl: './data-series-generator.component.html',
  styleUrls: ['./data-series-generator.component.css']
})
export class DataSeriesGeneratorComponent implements OnInit {

  private fileName = 'DataSeriesFile.csv';

  private isDisableButton: boolean;
  private generateDataSeriesForm: GenerateDataSeriesForm;
  private numberCoefficients: number;

  constructor(
    private downloadService: HttpDownloadService,
    private messageService: MessageService
    ) {
  }

  ngOnInit() {
    this.numberCoefficients = null;
    this.isDisableButton = false;
    this.generateDataSeriesForm = new GenerateDataSeriesForm();
    this.generateDataSeriesForm.mathematicalFunctionDTO = new MathematicalFunctionDTO();
    this.generateDataSeriesForm.mathematicalFunctionDTO.domainFunction = new DomainFunction();
    this.generateDataSeriesForm.mathematicalFunctionDTO.domainFunction.leftClosedInterval = true;
    this.generateDataSeriesForm.mathematicalFunctionDTO.domainFunction.rightClosedInterval = true;
    this.generateDataSeriesForm.mathematicalFunctionDTO.polynomialDTO = new PolynomialDTO();
  }

  private generateDataSeries() {
    this.generateDataSeriesForm.mathematicalFunctionDTO.polynomialDTO.degree = this.getDegree();
    this.downloadService.generateDataSeries(this.generateDataSeriesForm).subscribe(
      blobParts => {
        this.messageService.sendMessage(new Message('Generating data series completed successfully', MessageType.SUCCESS))
        importedSaveAs(blobParts, this.fileName);
        this.ngOnInit();
      }
    );
  }

  private onChangeNumber(numberCoefficients: number) {
    if (numberCoefficients !== undefined && numberCoefficients !== null && numberCoefficients <= 100 && numberCoefficients >= 2) {
      this.generateDataSeriesForm.mathematicalFunctionDTO.polynomialDTO.coefficients = [];
      for (let i = 0; i < numberCoefficients; i++) {
        this.generateDataSeriesForm.mathematicalFunctionDTO.polynomialDTO.coefficients.push(1);
      }
    } else {
      this.generateDataSeriesForm.mathematicalFunctionDTO.polynomialDTO.coefficients = null;
    }
  }

  indexTracker(index: number, value: number) {
    return index;
  }

  getDegree(): number {
    const size = this.generateDataSeriesForm.mathematicalFunctionDTO.polynomialDTO.coefficients.length;
    if (this.generateDataSeriesForm.trigonometricPolynomial) {
      if (size % 2 === 0) {
        return size / 2;
      } else {
        return (size - 1) / 2;
      }
    } else {
      return size - 1;
    }
  }
}

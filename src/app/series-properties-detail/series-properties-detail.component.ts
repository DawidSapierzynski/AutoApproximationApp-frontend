import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { ChosenMethodDTO } from '../dto/ChosenMethodDTO';
import { SeriesPropertiesDTO } from '../dto/SeriesPropertiesDTO';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';
import { ApproximationView } from '../dto/ApproximationView';
import { DomainFunction } from '../dto/DomainFunction';
import { HttpDownloadService } from '../service/download/http-download.service';
import { MathematicalFunctionDTO } from '../dto/MathematicalFunction';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-series-properties',
  templateUrl: './series-properties-detail.component.html',
  styleUrls: ['./series-properties-detail.component.css']
})
export class SeriesPropertiesDetailComponent implements OnInit {

  private seriesProperties: SeriesPropertiesDTO;
  private scatterChart: Chart;
  private chosenMethods: ChosenMethodDTO[];
  private approximationViews: ApproximationView[] = [];
  private fileName = 'approximationFile.txt';

  private colors: string[] = ['yellow', 'green', 'blue', 'black'];
  private nbColor = 0;

  private datasets = [];

  constructor(
    private route: ActivatedRoute,
    private httpSeriesPropertiesService: HttpSeriesPropertiesService,
    private downloadService: HttpDownloadService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (queryparams: Params) => {
        this.httpSeriesPropertiesService.getSeriesProperties(queryparams.id).subscribe(
          data => {
            this.seriesProperties = data;
            this.chosenMethods = undefined;
            this.datasets = [{
              label: 'Points',
              data: data.points,
              borderColor: 'red',
              backgroundColor: 'red',
              borderWidth: 1.5
            }];
            this.scatterChart = this.getChart(this.datasets);
          });
      });
  }

  private selectMethods(): void {
    this.httpSeriesPropertiesService.selectMethods(this.seriesProperties)
      .subscribe(data => {
        this.chosenMethods = data;
      });
  }

  private doApproximations(chosenMethod: ChosenMethodDTO): void {
    this.httpSeriesPropertiesService.doApproximations(chosenMethod, this.seriesProperties.points).subscribe(
      data => {
        this.approximationViews.push(new ApproximationView(data.mathematicalFunctionDTOs, chosenMethod.method));
        this.datasets.push({
          label: chosenMethod.method + '(' + chosenMethod.degree + ')',
          data: data.points,
          borderColor: this.colors[this.nbColor],
          backgroundColor: this.colors[this.nbColor],
          showLine: true,
          fill: false,
          pointRadius: 0
        });
        this.scatterChart.update();
      });

    chosenMethod.isUsed = true;

    this.nbColor++;
    if (this.nbColor > 2) {
      this.nbColor = 0;
    }
  }

  private getChart(data) {
    return new Chart('scatterChart', {
      type: 'scatter',
      data: {
        datasets: data
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy'
            },
            zoom: {
              enabled: true,
              mode: 'xy'
            }
          }
        },
        responsive: true
      }
    });
  }

  private coefficientsString(coefficients: number[]): string {
    let text = '';

    coefficients.forEach((value, index) => {
      text = text + (`a${index}=${value}, `);
    }
    );

    return text;
  }

  private domainString(domain: DomainFunction): string {
    const text = (domain.leftClosedInterval ? '<' : '(') + domain.beginningInterval + '; '
      + domain.endInterval + (domain.rightClosedInterval ? '>' : ')');

    return text;
  }

  private download(mathematicalFunctionDTOs: MathematicalFunctionDTO[]) {
    this.downloadService.downloadApproximation(mathematicalFunctionDTOs).subscribe(blobParts => {
      importedSaveAs(blobParts, this.fileName);
    });

  }

}

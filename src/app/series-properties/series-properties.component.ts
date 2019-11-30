import { Component, OnInit } from '@angular/core';
import {
  HttpSeriesPropertiesService, SeriesProperties, ChosenMethod, ApproximationForm
} from '../service/http-series-properties.service';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';


@Component({
  selector: 'app-series-properties',
  templateUrl: './series-properties.component.html',
  styleUrls: ['./series-properties.component.css']
})
export class SeriesPropertiesComponent implements OnInit {

  seriesProperties: SeriesProperties;
  scatterChart: Chart;
  chosenMethods: ChosenMethod[];
  approximationForm: ApproximationForm;
  precision: number;
  seriesDatesFile: File;

  colors: string[] = ['yellow', 'green', 'blue', 'black'];
  nbColor = 0;

  datasets = [];

  constructor(
    private httpSeriesPropertiesService: HttpSeriesPropertiesService
  ) { }

  ngOnInit() {
  }

  createSeriesProperties(): void {
    this.httpSeriesPropertiesService.uploadDataSeriesFile(this.seriesDatesFile).subscribe(
      dateSeriesId => {
        this.httpSeriesPropertiesService.calculateSeriesProperties(this.precision, dateSeriesId)
          .subscribe(data => {
            this.seriesProperties = data;
            this.datasets.push({
              label: 'Points',
              data: data.points,
              borderColor: 'red',
              backgroundColor: 'red',
              borderWidth: 1.5
            });
            this.scatterChart = new Chart('scatterChart', {
              type: 'scatter',
              data: {
                datasets: this.datasets
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
          }, error => {
            alert(error);
          });
      }
    );

  }

  selectMethods(): void {
    this.httpSeriesPropertiesService.selectMethods(this.seriesProperties)
      .subscribe(data => {
        this.chosenMethods = data;
      }, error => {
        alert(error);
      });
  }

  doApproximations(chosenMethod: ChosenMethod): void {
    this.httpSeriesPropertiesService.doApproximations(chosenMethod, this.seriesProperties.points).subscribe(
      data => {
        this.approximationForm = data;
        this.datasets.push({
          label: chosenMethod.method.toString + '(' + chosenMethod.degree + ')',
          data: this.approximationForm.points,
          borderColor: this.colors[this.nbColor],
          backgroundColor: this.colors[this.nbColor],
          showLine: true,
          fill: false,
          pointRadius: 0
        });
        this.scatterChart.update();
      }, error => {
        alert(error);
      }
    );

    chosenMethod.isUsed = true;

    this.nbColor++;
    if (this.nbColor > 2) {
      this.nbColor = 0;
    }
  }
}

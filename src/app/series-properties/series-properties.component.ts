import { Component, OnInit } from '@angular/core';
import {
  HttpSeriesPropertiesService} from '../service/series-properties/http-series-properties.service';
import { ApproximationDTO } from '../dto/ApproximationDTO';
import { ChosenMethodDTO } from '../dto/ChosenMethodDTO';
import { SeriesPropertiesDTO } from '../dto/SeriesPropertiesDTO';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';
import { TokenStorageService } from '../service/auth/token-storage.service';


@Component({
  selector: 'app-series-properties',
  templateUrl: './series-properties.component.html',
  styleUrls: ['./series-properties.component.css']
})
export class SeriesPropertiesComponent implements OnInit {

  seriesProperties: SeriesPropertiesDTO;
  scatterChart: Chart;
  chosenMethods: ChosenMethodDTO[];
  approximationForm: ApproximationDTO;
  precision: number;
  seriesDatesFile: File;

  colors: string[] = ['yellow', 'green', 'blue', 'black'];
  nbColor = 0;

  datasets = [];

  constructor(
    private httpSeriesPropertiesService: HttpSeriesPropertiesService,
    private token: TokenStorageService
  ) { }

  ngOnInit() {
  }

  handleImages(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.seriesDatesFile = event.target.files[0];
    }
  }

  createSeriesProperties(): void {
    this.httpSeriesPropertiesService.uploadDataSeriesFile(this.seriesDatesFile).subscribe(
      dateSeriesFile => {
        this.httpSeriesPropertiesService.calculateSeriesProperties(this.precision, dateSeriesFile.id)
          .subscribe(data => {
            this.seriesProperties = data;
            this.datasets.push({
              label: 'Points',
              data: data.points,
              borderColor: 'red',
              backgroundColor: 'red',
              borderWidth: 1.5
            });
            this.scatterChart = this.getChart(this.datasets);
          }, error => {
            alert(`${error.status}: ${error.message}`);
          });
      }, error => {
        alert(`${error.status}: ${error.message}`);
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

  doApproximations(chosenMethod: ChosenMethodDTO): void {
    this.httpSeriesPropertiesService.doApproximations(chosenMethod, this.seriesProperties.points).subscribe(
      data => {
        this.approximationForm = data;
        this.datasets.push({
          label: chosenMethod.method + '(' + chosenMethod.degree + ')',
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

  getChart(data) {
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
}

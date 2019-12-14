import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params } from '@angular/router';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { ApproximationDTO } from '../dto/ApproximationDTO';
import { ChosenMethodDTO } from '../dto/ChosenMethodDTO';
import { SeriesPropertiesDTO } from '../dto/SeriesPropertiesDTO';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';


@Component({
  selector: 'app-series-properties',
  templateUrl: './series-properties-detail.component.html',
  styleUrls: ['./series-properties-detail.component.css']
})
export class SeriesPropertiesDetailComponent implements OnInit {

  seriesProperties: SeriesPropertiesDTO;
  scatterChart: Chart;
  chosenMethods: ChosenMethodDTO[];
  approximationForm: ApproximationDTO;

  colors: string[] = ['yellow', 'green', 'blue', 'black'];
  nbColor = 0;

  datasets = [];

  constructor(
    private route: ActivatedRoute,
    private httpSeriesPropertiesService: HttpSeriesPropertiesService
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

  selectMethods(): void {
    this.httpSeriesPropertiesService.selectMethods(this.seriesProperties)
      .subscribe(data => {
        this.chosenMethods = data;
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
      });

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

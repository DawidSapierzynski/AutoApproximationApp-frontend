import { Component, OnInit } from '@angular/core';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  private precision: number;
  private seriesDatesFile: File;
  private isDisableButton: boolean;

  constructor(
    private httpSeriesPropertiesService: HttpSeriesPropertiesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.precision = 3;
    this.isDisableButton = true;
  }

  private handleFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.seriesDatesFile = event.target.files[0];
      this.isDisableButton = false;
    } else {
      this.isDisableButton = true;
    }
  }

  private createSeriesProperties(): void {
    this.isDisableButton = true;
    this.httpSeriesPropertiesService.uploadDataSeriesFile(this.seriesDatesFile).subscribe(
      dateSeriesFile => {
        this.httpSeriesPropertiesService.postSeriesProperties(this.precision, dateSeriesFile.id)
          .subscribe(data => {
            this.router.navigate(['/series-properties-detail', data.id]);
          });
      }
    );
    this.isDisableButton = false;

  }

}

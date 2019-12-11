import { Component, OnInit } from '@angular/core';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  precision: number;
  seriesDatesFile: File;

  constructor(
    private httpSeriesPropertiesService: HttpSeriesPropertiesService,
    private router: Router
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
        this.httpSeriesPropertiesService.postSeriesProperties(this.precision, dateSeriesFile.id)
          .subscribe(data => {
            this.router.navigate(['/series-properties-detail', data.id]);
          }, error => {
            alert(`${error.status}: ${error.message}`);
          });
      }, error => {
        alert(`${error.status}: ${error.message}`);
      }
    );

  }

}

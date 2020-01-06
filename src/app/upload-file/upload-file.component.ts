import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpApproximationPropertiesService} from '../service/approximation-properties/http-approximation-properties.service';
import {Router} from '@angular/router';
import {HttpDataSeriesFileService} from '../service/data-series-file/http-data-series-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @ViewChild('labelElement', {static: false})
  private labelElement: ElementRef;

  private maxSize = 1048576;
  private maxError = false;
  private labelName = 'Choose series date file';
  private precision: number;
  private seriesDatesFile: File;
  private isDisableButton: boolean;

  constructor(
    private approximationPropertiesService: HttpApproximationPropertiesService,
    private httpDataSeriesFileService: HttpDataSeriesFileService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.precision = 3;
    this.isDisableButton = true;
  }

  private handleFile(files: FileList) {
    if (files && files.length > 0) {
      if (files.item(0).size > this.maxSize) {
        this.isDisableButton = true;
        this.maxError = true;
      } else {
        this.labelElement.nativeElement.innerText = Array.from(files)
          .map(f => f.name)
          .join(', ');
        this.seriesDatesFile = files.item(0);
        this.isDisableButton = false;
        this.maxError = false;
      }
    } else {
      this.labelElement.nativeElement.innerText = this.labelName;
      this.isDisableButton = true;
    }
  }

  private createApproximationProperties(): void {
    this.isDisableButton = true;
    this.httpDataSeriesFileService.uploadDataSeriesFile(this.seriesDatesFile).subscribe(
      dateSeriesFile => {
        this.approximationPropertiesService.postApproximationProperties(this.precision, dateSeriesFile.id)
          .subscribe(data => {
            this.router.navigate(['/approximation-properties-detail', data.id]);
          });
      }
    );
    this.isDisableButton = false;

  }

}

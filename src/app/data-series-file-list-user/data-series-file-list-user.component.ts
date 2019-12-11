import { Component, OnInit } from '@angular/core';
import { DataSeriesFileDTO } from '../dto/DataSeriesFileDTO';
import { HttpDataSeriesFileService } from '../service/data-series-file/http-data-series-file.service';
import { TokenStorageService } from '../service/auth/token-storage.service';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-series-file-list-user',
  templateUrl: './data-series-file-list-user.component.html',
  styleUrls: ['./data-series-file-list-user.component.css']
})
export class DataSeriesFileListUserComponent implements OnInit {
  private roles: string[];
  private precision: number;
  private dataSeriesFileDTOList: DataSeriesFileDTO[];

  constructor(
    private dataSeriesFileService: HttpDataSeriesFileService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private httpSeriesPropertiesService: HttpSeriesPropertiesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    if (this.checkRoles('ADMIN')) {
      this.dataSeriesFileService.getDataSeriesFilesAdmin().subscribe(
        data => {
          this.dataSeriesFileDTOList = data;
        }, error => {
          alert(`${error.status}: ${error.message}`);
        }
      );
    } else if (this.checkRoles('USER')) {
      this.dataSeriesFileService.getDataSeriesFilesUser().subscribe(
        data => {
          this.dataSeriesFileDTOList = data;
        }, error => {
          alert(`${error.status}: ${error.message}`);
        }
      );
    }
  }

  checkRoles(role: string) {
    return this.roles.includes(role);
  }

  open(content, id: number) {
    this.modalService.open(content, {ariaLabelledBy: 'create-series-properties'}).result.then((result) => {
      this.precision = result;
      this.httpSeriesPropertiesService.postSeriesProperties(this.precision, id)
          .subscribe(data => {
            this.router.navigate(['/series-properties-detail', data.id]);
          }, error => {
            alert(`${error.status}: ${error.message}`);
          });
    });
  }

}

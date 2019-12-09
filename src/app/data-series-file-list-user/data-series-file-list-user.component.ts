import { Component, OnInit } from '@angular/core';
import { DataSeriesFileDTO } from '../dto/DataSeriesFileDTO';
import { HttpDataSeriesFileService } from '../service/data-series-file/http-data-series-file.service';
import { TokenStorageService } from '../service/auth/token-storage.service';

@Component({
  selector: 'app-data-series-file-list-user',
  templateUrl: './data-series-file-list-user.component.html',
  styleUrls: ['./data-series-file-list-user.component.css']
})
export class DataSeriesFileListUserComponent implements OnInit {
  private roles: string[];
  private dataSeriesFileDTOList: DataSeriesFileDTO[];

  constructor(private dataSeriesFileService: HttpDataSeriesFileService, private tokenStorage: TokenStorageService) { }

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

}

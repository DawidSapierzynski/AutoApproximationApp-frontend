import { Component, OnInit } from '@angular/core';
import { SeriesPropertiesDTO } from '../dto/SeriesPropertiesDTO';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { TokenStorageService } from '../service/auth/token-storage.service';

@Component({
  selector: 'app-series-properties-list',
  templateUrl: './series-properties-list.component.html',
  styleUrls: ['./series-properties-list.component.css']
})
export class SeriesPropertiesListUserComponent implements OnInit {
  private roles: string[];
  private seriesPropertiesDTOList: SeriesPropertiesDTO[];

  constructor(private seriesPropertiesService: HttpSeriesPropertiesService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    if (this.checkRoles('ADMIN')) {
      this.seriesPropertiesService.getSeriesPropertiesAdmin().subscribe(
        data => {
          this.seriesPropertiesDTOList = data;
        }, error => {
          alert(`${error.status}: ${error.message}`);
        }
      );
    } else if (this.checkRoles('USER')) {
      this.seriesPropertiesService.getSeriesPropertiesUser().subscribe(
        data => {
          this.seriesPropertiesDTOList = data;
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

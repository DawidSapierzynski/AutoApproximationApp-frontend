import { Component, OnInit } from '@angular/core';
import { SeriesPropertiesDTO } from '../dto/SeriesPropertiesDTO';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { TokenStorageService } from '../service/auth/token-storage.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-series-properties-list',
  templateUrl: './series-properties-list.component.html',
  styleUrls: ['./series-properties-list.component.css']
})
export class SeriesPropertiesListUserComponent implements OnInit {
  private roles: string[];
  private seriesPropertiesDTOList: SeriesPropertiesDTO[];
  private selectedList: SeriesPropertiesDTO[];
  private isDisabledButton: boolean;

  constructor(
    private seriesPropertiesService: HttpSeriesPropertiesService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    this.loadSeriesProperties();
  }

  private checkRoles(role: string) {
    return this.roles.includes(role);
  }

  private openDelete(deleted) {
    this.modalService.open(deleted, { ariaLabelledBy: 'Delete-series-properties' }).result.then(() => {
      this.deletedSelected();
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private selected(seriesPropertiesDTO: SeriesPropertiesDTO) {
    if (this.selectedList.includes(seriesPropertiesDTO)) {
      const index = this.selectedList.indexOf(seriesPropertiesDTO, 0);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      }
    } else {
      this.selectedList.push(seriesPropertiesDTO);
    }
    if (this.selectedList.length === 0) {
      this.isDisabledButton = true;
    } else {
      this.isDisabledButton = false;
    }
  }

  private deletedSelected() {
    this.isDisabledButton = true;
    for (const i of this.selectedList) {
      this.seriesPropertiesService.deleteSeriesProperties(i.id);
    }
    window.location.reload();
  }

  private loadSeriesProperties() {
    if (this.checkRoles('ADMIN')) {
      this.seriesPropertiesService.getSeriesPropertiesAdmin().subscribe(
        data => {
          this.seriesPropertiesDTOList = data;
        }
      );
    } else if (this.checkRoles('USER')) {
      this.seriesPropertiesService.getSeriesPropertiesUser().subscribe(
        data => {
          this.seriesPropertiesDTOList = data;
        }
      );
    }
    this.selectedList = [];
    this.isDisabledButton = true;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

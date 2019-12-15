import { Component, OnInit } from '@angular/core';
import { DataSeriesFileDTO } from '../dto/DataSeriesFileDTO';
import { HttpDataSeriesFileService } from '../service/data-series-file/http-data-series-file.service';
import { TokenStorageService } from '../service/auth/token-storage.service';
import { HttpSeriesPropertiesService } from '../service/series-properties/http-series-properties.service';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../service/message/message.service';
import { Message, MessageType } from '../message/Message';

@Component({
  selector: 'app-data-series-file-listr',
  templateUrl: './data-series-file-list.component.html',
  styleUrls: ['./data-series-file-list.component.css']
})
export class DataSeriesFileListComponent implements OnInit {
  private roles: string[];
  private precision: number;
  private dataSeriesFileDTOList: DataSeriesFileDTO[];
  private selectedList: DataSeriesFileDTO[];
  private isDisabledButton: boolean;

  constructor(
    private dataSeriesFileService: HttpDataSeriesFileService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private httpSeriesPropertiesService: HttpSeriesPropertiesService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    this.loadDataSeriesFile();
  }

  private checkRoles(role: string) {
    return this.roles.includes(role);
  }

  private openCreate(create, id: number) {
    this.modalService.open(create, { ariaLabelledBy: 'create-series-properties' }).result.then((result) => {
      this.precision = result;
      this.httpSeriesPropertiesService.postSeriesProperties(this.precision, id)
        .subscribe(data => {
          this.router.navigate(['/series-properties-detail', data.id]);
        });
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private openDelete(deleted) {
    this.modalService.open(deleted, { ariaLabelledBy: 'Delete-series-properties' }).result.then(() => {
      this.deletedSelected();
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private selected(dataSeriesFileDTO: DataSeriesFileDTO) {
    if (this.selectedList.includes(dataSeriesFileDTO)) {
      const index = this.selectedList.indexOf(dataSeriesFileDTO, 0);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      }
    } else {
      this.selectedList.push(dataSeriesFileDTO);
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
      this.dataSeriesFileService.deleteDataSeriesFilesAdmin(i.id).subscribe(
        data => {
          this.messageService.sendMessage(new Message(data.message, MessageType.SUCCESS));
          this.loadDataSeriesFile();
        });
    }
  }

  private loadDataSeriesFile() {
    if (this.checkRoles('ADMIN')) {
      this.dataSeriesFileService.getDataSeriesFilesAdmin().subscribe(
        data => {
          this.dataSeriesFileDTOList = data;
        });
    } else if (this.checkRoles('USER')) {
      this.dataSeriesFileService.getDataSeriesFilesUser().subscribe(
        data => {
          this.dataSeriesFileDTOList = data;
        });
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
      return `with: ${reason}`;
    }
  }

}

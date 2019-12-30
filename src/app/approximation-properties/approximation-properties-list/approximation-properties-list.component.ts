import {Component, OnInit} from '@angular/core';
import {ApproximationPropertiesDTO} from '../../dto/ApproximationPropertiesDTO';
import {HttpApproximationPropertiesService} from '../../service/approximation-properties/http-approximation-properties.service';
import {TokenStorageService} from '../../service/auth/token-storage.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../service/message/message.service';
import {Message, MessageType} from '../../message/Message';

@Component({
  selector: 'app-series-properties-list',
  templateUrl: './approximation-properties-list.component.html',
  styleUrls: ['./approximation-properties-list.component.css']
})
export class ApproximationPropertiesListUserComponent implements OnInit {

  constructor(
    private approximationPropertiesService: HttpApproximationPropertiesService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private messageService: MessageService
  ) {
  }

  private roles: string[];
  private approximationPropertiesDTOList: ApproximationPropertiesDTO[];
  private selectedList: ApproximationPropertiesDTO[];
  private isDisabledButton: boolean;

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    this.loadApproximationProperties();
  }

  private checkRoles(role: string) {
    return this.roles.includes(role);
  }

  private openDelete(deleted) {
    this.modalService.open(deleted, {ariaLabelledBy: 'Delete-approximation-properties'}).result.then(() => {
      this.deletedSelected();
    }, (reason) => {
      console.log(`Dismissed ${ApproximationPropertiesListUserComponent.getDismissReason(reason)}`);
    });
  }

  private selected(approximationPropertiesDTO: ApproximationPropertiesDTO) {
    if (this.selectedList.includes(approximationPropertiesDTO)) {
      const index = this.selectedList.indexOf(approximationPropertiesDTO, 0);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      }
    } else {
      this.selectedList.push(approximationPropertiesDTO);
    }
    this.isDisabledButton = this.selectedList.length === 0;
  }

  private deletedSelected() {
    this.isDisabledButton = true;
    for (const i of this.selectedList) {
      this.approximationPropertiesService.deleteApproximationProperties(i.id).subscribe(data => {
        this.messageService.sendMessage(new Message(data.message, MessageType.SUCCESS));
        this.loadApproximationProperties();
      });
    }
  }

  private loadApproximationProperties() {
    if (this.checkRoles('ADMIN')) {
      this.approximationPropertiesService.getApproximationPropertiesAdmin().subscribe(
        data => {
          this.approximationPropertiesDTOList = data;
        }
      );
    } else if (this.checkRoles('USER')) {
      this.approximationPropertiesService.getApproximationPropertiesUser().subscribe(
        data => {
          this.approximationPropertiesDTOList = data;
        }
      );
    }
    this.selectedList = [];
    this.isDisabledButton = true;
  }

}

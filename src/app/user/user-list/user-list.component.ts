import { Component, OnInit } from '@angular/core';
import { HttpUserService } from '../../service/user/http-user.service';
import { UserDTO } from '../../dto/UserDTO';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../service/auth/token-storage.service';
import { MessageService } from '../../service/message/message.service';
import { Message, MessageType } from '../../message/Message';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService: HttpUserService,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private messageService: MessageService
  ) {
  }
  public userDTOList: UserDTO[];
  private selectedList: UserDTO[];
  private isDisabledButton: boolean;
  private username: string;

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
    this.tokenStorageService.usernameObservable.subscribe((u) => {
      this.username = u;
    });
    this.loadUsers();
  }

  private openDelete(deleted) {
    this.modalService.open(deleted, { ariaLabelledBy: 'Delete-user' }).result.then(() => {
      this.deletedSelected();
    }, (reason) => {
      console.log(`Dismissed ${UserListComponent.getDismissReason(reason)}`);
    });
  }

  private selected(userDTO: UserDTO) {
    if (this.selectedList.includes(userDTO)) {
      const index = this.selectedList.indexOf(userDTO, 0);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      }
    } else {
      this.selectedList.push(userDTO);
    }
    this.isDisabledButton = this.selectedList.length === 0;
  }

  private loadUsers() {
    this.userService.getAllUser().subscribe(
      data => {
        this.userDTOList = data;
      }
    );
    this.isDisabledButton = true;
    this.selectedList = [];
  }

  private deletedSelected() {
    this.isDisabledButton = true;
    for (const i of this.selectedList) {
      this.userService.deleteUser(i.id).subscribe(
        data => {
          this.messageService.sendMessage(new Message(data.message, MessageType.SUCCESS));
          this.loadUsers();
        }
      );
    }
  }

}

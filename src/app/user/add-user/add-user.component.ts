import { Component, OnInit } from '@angular/core';
import { HttpUserService } from '../../service/user/http-user.service';
import { RoleUserDTO } from '../../dto/RoleUserDTO';
import { SignUpForm } from '../../dto/SignUpForm';
import { AuthService } from '../../service/auth/auth.service';
import { MessageService } from '../../service/message/message.service';
import { Message, MessageType } from '../../message/Message';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  private roleUserDTOList: RoleUserDTO[];
  private signUpInfo: SignUpForm;
  private isDisableButton: boolean;

  constructor(
    private addUserService: HttpUserService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.isDisableButton = false;
    this.addUserService.getUserRole().subscribe(
      data => {
        this.roleUserDTOList = data;
      });
    this.signUpInfo = new SignUpForm();
  }

  private selected(roleUserDTO: RoleUserDTO) {
    if (this.signUpInfo.role.includes(roleUserDTO)) {
      const index = this.signUpInfo.role.indexOf(roleUserDTO, 0);
      if (index > -1) {
        this.signUpInfo.role.splice(index, 1);
      }
    } else {
      this.signUpInfo.role.push(roleUserDTO);
    }
  }

  private addUser() {
    this.isDisableButton = true;
    this.authService.addUser(this.signUpInfo).subscribe(
      data => {
        this.messageService.sendMessage(new Message(`${data.message}`, MessageType.SUCCESS));
        this.signUpInfo = new SignUpForm();
        this.isDisableButton = false;
      });
    this.isDisableButton = false;
  }

}

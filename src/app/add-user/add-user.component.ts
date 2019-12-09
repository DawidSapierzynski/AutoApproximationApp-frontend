import { Component, OnInit } from '@angular/core';
import { HttpUserService } from '../service/user/http-user.service';
import { RoleUserDTO } from '../dto/RoleUserDTO';
import { SignUpForm } from '../dto/SignUpForm';
import { AuthService } from '../service/auth/auth.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  private roleUserDTOList: RoleUserDTO[];
  private signUpInfo: SignUpForm;

  constructor(
    private addUserService: HttpUserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.addUserService.getUserRole().subscribe(
      data => {
        this.roleUserDTOList = data;
      }, error => {
        alert(`${error.status}: ${error.message}`);
      }
    );
    this.signUpInfo = new SignUpForm();
  }

  selected(roleUserDTO: RoleUserDTO) {
    if (this.signUpInfo.role.includes(roleUserDTO)) {
      const index = this.signUpInfo.role.indexOf(roleUserDTO, 0);
      if (index > -1) {
        this.signUpInfo.role.splice(index, 1);
      }
    } else {
      this.signUpInfo.role.push(roleUserDTO);
    }
  }

  addUser() {
    this.authService.addUser(this.signUpInfo).subscribe(
      data => {
        alert(`${data.message}`);
      }, error => {
        alert(`${error.status}: ${error.message}`);
      }
    );
  }

}

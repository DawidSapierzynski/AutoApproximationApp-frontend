import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpUserService } from '../service/user/http-user.service';
import { UserDTO } from '../dto/UserDTO';
import { RoleUserDTO } from '../dto/RoleUserDTO';
import { TokenStorageService } from '../service/auth/token-storage.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private userDto: UserDTO;
  private allRolesUser: RoleUserDTO[];
  private isAdmin: boolean;
  private isDisableButton: boolean;

  constructor(
    private route: ActivatedRoute,
    private httpUserService: HttpUserService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    this.isDisableButton = false;
    this.route.params.subscribe(
      (queryparams: Params) => {
        this.httpUserService.getUser(queryparams.id).subscribe(
          data => {
            this.userDto = data;
          }, error => {
            alert(`${error.status}: ${error.message}`);
          }
        );
      });

    this.httpUserService.getUserRole().subscribe(
      data => {
        this.allRolesUser = data;
      }, error => {
        alert(`${error.status}: ${error.message}`);
      });

    this.tokenStorageService.rolesObservable.subscribe(
      r => {
        this.isAdmin = r.includes('ADMIN');
      }
    );
  }

  private check(roleUserId: number) {
    return this.userDto.rolesUserDto.map((role) => role.id).includes(roleUserId);
  }

  private selected(roleUserDTO: RoleUserDTO) {
    if (this.check(roleUserDTO.id)) {
      const index = this.userDto.rolesUserDto.map((role) => role.id).indexOf(roleUserDTO.id, 0);
      if (index > -1) {
        this.userDto.rolesUserDto.splice(index, 1);
      }
    } else {
      this.userDto.rolesUserDto.push(roleUserDTO);
    }
  }

  private updateUser() {
    this.isDisableButton = true;
    this.httpUserService.updateUser(this.userDto).subscribe(
      data => {
        this.userDto = data;
        alert('Saved');
      }, error => {
        alert(`${error.status}: ${error.message}`);
      }
    );
    this.isDisableButton = false;
  }

}

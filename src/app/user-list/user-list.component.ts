import { Component, OnInit } from '@angular/core';
import { HttpUserService } from '../service/user/http-user.service';
import { UserDTO } from '../dto/UserDTO';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userDTOList: UserDTO[];

  constructor(private userService: HttpUserService) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(
      data => {
        this.userDTOList = data;
      }, error => {
        alert(`${error.status}: ${error.message}`);
      }
    );
  }

}

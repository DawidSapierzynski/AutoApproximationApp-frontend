import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../service/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  private isLogged: boolean;
  private username: string;
  private userId: string;

  constructor(
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    this.tokenStorage.isLoggedObservable.subscribe(l => {
      this.isLogged = l;
    });

    this.tokenStorage.usernameObservable.subscribe(u => {
      this.username = u;
    });

    this.tokenStorage.userIdObservable.subscribe(id => {
      this.userId = id;
    });

  }

  private logout() {
    this.tokenStorage.signOut();
  }

}

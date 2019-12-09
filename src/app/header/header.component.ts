import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  private isLogged: boolean;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    this.tokenStorage.isLoggedObservable.subscribe(l => {
      this.isLogged = l;
    });
  }

  logout() {
    this.tokenStorage.signOut();
  }

}

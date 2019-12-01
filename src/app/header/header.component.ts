import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[];

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  checkRole(role: string): boolean {
    if (this.roles) {
      return this.roles.some((i) => i === role);
    }
  }

}

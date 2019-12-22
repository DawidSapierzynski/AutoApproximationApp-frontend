import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth/auth.service';
import { TokenStorageService } from '../service/auth/token-storage.service';
import { AuthLoginInfo } from '../dto/AuthLoginInfo';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private form: any = {};
  private isLoggedIn = false;
  private isLoginFailed = false;
  private loginInfo: AuthLoginInfo;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.tokenStorage.getToken();
    if (token) {
      this.tokenStorage.signOut();
    }
  }

  private onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveUserId(data.userId);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.redirectPage('/');
      });

  }

  private redirectPage(path: string) {
    this.router.navigate([path]);
  }
}

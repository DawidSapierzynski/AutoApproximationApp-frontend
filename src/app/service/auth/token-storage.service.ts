import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USERID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private rolesBS = new BehaviorSubject<Array<string>>([]);
  private isLoggedBS = new BehaviorSubject<boolean>(false);
  private usernameBS = new BehaviorSubject<string>('');
  private userIdBS = new BehaviorSubject<string>('');

  rolesObservable = this.rolesBS.asObservable();
  isLoggedObservable = this.isLoggedBS.asObservable();
  usernameObservable = this.usernameBS.asObservable();
  userIdObservable = this.userIdBS.asObservable();

  private roles: Array<string> = [];

  constructor(private router: Router) {
    if (this.getToken() !== null && this.getToken() !== undefined) {
      this.isLoggedBS.next(true);
      this.parseAuthorities();
      this.usernameBS.next(this.getUsername());
      this.userIdBS.next(this.getUserId());
    }
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.removeItem(USERID_KEY);
    this.isLoggedBS.next(false);
    this.rolesBS.next([]);
    this.usernameBS.next('');
    this.userIdBS.next('');
    this.router.navigate(['/login']);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.isLoggedBS.next(true);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
    this.usernameBS.next(username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveUserId(userId: string) {
    window.sessionStorage.removeItem(USERID_KEY);
    window.sessionStorage.setItem(USERID_KEY, userId);
    this.userIdBS.next(userId);
  }

  public getUserId(): string {
    return sessionStorage.getItem(USERID_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    this.parseAuthorities();
  }

  public getAuthorities(): string[] {
    return this.roles;
  }

  private parseAuthorities() {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    this.rolesBS.next(this.roles);
  }
}

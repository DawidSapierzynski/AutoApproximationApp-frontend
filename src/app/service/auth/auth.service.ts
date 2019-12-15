import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from '../../dto/JwtResponse';
import { AuthLoginInfo } from '../../dto/AuthLoginInfo';
import { SignUpForm } from '../../dto/SignUpForm';
import { ResponseMessage } from '../../dto/ResponseMessage';
import { AUTH_URL } from '../url.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    const loginUrl = AUTH_URL.SIGNIN;

    return this.http.post<JwtResponse>(loginUrl, credentials, httpOptions);
  }

  public addUser(info: SignUpForm) {
    return this.http.post<ResponseMessage>(AUTH_URL.SIGNUP, info, httpOptions);
  }
}

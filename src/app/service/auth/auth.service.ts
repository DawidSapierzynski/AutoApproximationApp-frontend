import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from '../../dto/JwtResponse';
import { AuthLoginInfo } from '../../dto/AuthLoginInfo';
import { SignUpForm } from '../../dto/SignUpForm';
import { ResponseMessage } from '../../dto/ResponseMessage';

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
    const loginUrl = '/api/auth/signin';

    return this.http.post<JwtResponse>(loginUrl, credentials, httpOptions);
  }

  public addUser(info: SignUpForm) {
    const signupUrl = '/api/auth/signup';

    return this.http.post<ResponseMessage>(signupUrl, info, httpOptions);
  }
}

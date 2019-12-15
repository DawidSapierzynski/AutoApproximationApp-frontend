import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleUserDTO } from '../../dto/RoleUserDTO';
import { UserDTO } from '../../dto/UserDTO';
import { ResponseMessage } from 'src/app/dto/ResponseMessage';
import { USER_URL } from '../url.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private httpClient: HttpClient) { }

  public getUserRole() {
    return this.httpClient.get<RoleUserDTO[]>(USER_URL.ROLE);
  }

  public getAllUser() {
    return this.httpClient.get<UserDTO[]>(USER_URL.GET_ALL);
  }

  public deleteUser(id: number) {
    const endpoint = USER_URL.DELETE + id;

    return this.httpClient.delete<ResponseMessage>(endpoint);
  }

  public getUser(id: number) {
    const endpoint = USER_URL.GET_ONE + id;

    return this.httpClient.get<UserDTO>(endpoint);
  }

  public updateUser(userDTO: UserDTO) {
    const endpoint = USER_URL.UPDATE + userDTO.id;

    return this.httpClient.put<UserDTO>(endpoint, userDTO);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleUserDTO } from '../../dto/RoleUserDTO';
import { UserDTO } from '../../dto/UserDTO';
import { ResponseMessage } from 'src/app/dto/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private httpClient: HttpClient) { }

  public getUserRole() {
    const endpoint = '/api/roleUser';

    return this.httpClient.get<RoleUserDTO[]>(endpoint);
  }

  public getAllUser() {
    const endpoint = '/api/user';

    return this.httpClient.get<UserDTO[]>(endpoint);
  }

  public deleteUser(id: number) {
    const endpoint = '/api/user/' + id;

    return this.httpClient.delete<ResponseMessage>(endpoint);
  }

  public getUser(id: number) {
    const endpoint = '/api/user/' + id;

    return this.httpClient.get<UserDTO>(endpoint);
  }

  public updateUser(userDTO: UserDTO) {
    const endpoint = '/api/user/' + userDTO.id;

    return this.httpClient.put<UserDTO>(endpoint, userDTO);
  }
}

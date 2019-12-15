import { RoleUserDTO } from './RoleUserDTO';

export class UserDTO {
    public id: number;
    public login: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public deleted: boolean;
    public active: boolean;
    public rolesUserDto: RoleUserDTO[];
    public admin: boolean;

    constructor(
        id: number, login: string, firstName: string, lastName: string, email: string,
        deleted: boolean, active: boolean, role: RoleUserDTO[], admin: boolean
    ) {
        this.id = id;
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.deleted = deleted;
        this.active = active;
        this.rolesUserDto = role;
        this.admin = admin;
    }
}

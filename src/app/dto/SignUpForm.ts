import { RoleUserDTO } from './RoleUserDTO';

export class SignUpForm {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    role: RoleUserDTO[] = [];
    password: string;

    constructor() { }
}

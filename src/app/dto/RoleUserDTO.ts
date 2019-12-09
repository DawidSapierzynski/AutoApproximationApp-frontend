export class RoleUserDTO {
  public id: number;
  public code: string;
  public name: string;
  constructor(id: number, code: string, name: string) {
    this.id = id;
    this.code = code;
    this.name = name;
  }
}

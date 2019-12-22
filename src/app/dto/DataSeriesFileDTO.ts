export class DataSeriesFileDTO {
    public id: number;
    public name: string;
    public hashName: string;
    public dateSent: Date;
    public deleted: boolean;

    constructor(id: number, name: string, hashName: string, dateSent: Date, deleted: boolean) {
        this.id = id;
        this.name = name;
        this.hashName = hashName;
        this.dateSent = dateSent;
        this.deleted = deleted;
    }
}

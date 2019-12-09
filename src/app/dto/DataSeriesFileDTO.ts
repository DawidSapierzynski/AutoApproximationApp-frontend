export class DataSeriesFileDTO {
    public id: number;
    public name: string;
    public hashName: string;
    public dataSent: Date;
    public deleted: boolean;

    constructor(id: number, name: string, hashName: string, dataSent: Date, deleted: boolean) {
        this.id = id;
        this.name = name;
        this.hashName = hashName;
        this.dataSent = dataSent;
        this.deleted = deleted;
    }
}

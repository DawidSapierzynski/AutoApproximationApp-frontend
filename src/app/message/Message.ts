export class Message {
  public text: string;
  public type: string;
  public dateCreate: Date;

  constructor(text: string, type: MessageType) {
    this.text = text;
    this.type = type;
    this.dateCreate = new Date();
  }
}

export enum MessageType {
  INFO = 'alert alert-info',
  SUCCESS = 'alert alert-success',
  DANGER = 'alert alert-danger',
  WARNING = 'alert alert-warning'
}

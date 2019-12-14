export class Message {
    private text: string;
    private type: string;

    constructor(text: string, type: MessageType) {
        this.text = text;
        this.type = type;
    }
}

export enum MessageType {
    INFO = 'alert alert-info',
    SUCCESS = 'alert alert-success',
    DANGER = 'alert alert-danger',
    WARNING = 'alert alert-warning'
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../../message/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  private messageBS = new Subject<Message[]>();

  messageObservable = this.messageBS.asObservable();

  constructor() { }

  sendMessage(message: Message) {
    this.messages.push(message);
    this.messageBS.next(this.messages);
  }

  closeMessage(index: number) {
    this.messages.splice(index, 1);
    this.messageBS.next(this.messages);
  }

  clearMessage() {
    this.messages = [];
    this.messageBS.next();
  }

  getMessageObservable(): Observable<Message[]> {
    return this.messageBS.asObservable();
  }
}

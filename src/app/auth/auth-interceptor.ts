import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TokenStorageService } from '../service/auth/token-storage.service';
import { MessageService } from '../service/message/message.service';
import { Message, MessageType } from '../message/Message';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private token: TokenStorageService,
        private messageService: MessageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        if (token) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                this.messageService.sendMessage(
                    new Message(error.error.message !== 'No message available' ? error.error.message :
                        `Error status: ${error.statusText}`, MessageType.DANGER));
                return throwError(error);
            }));
    }
}



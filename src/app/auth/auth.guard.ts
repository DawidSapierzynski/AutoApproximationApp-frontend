import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenStorageService } from '../service/auth/token-storage.service';
import { Message, MessageType } from '../message/Message';
import { MessageService } from '../service/message/message.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardUser implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService,
        private messageService: MessageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenStorageService.getToken();
        const roles = this.tokenStorageService.getAuthorities();
        if (token && roles.includes('USER')) {
            return true;
        }
        this.messageService.sendMessage(new Message(`Path access denied: ${state.url}`, MessageType.DANGER));
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthGuardAdmin implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService,
        private messageService: MessageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenStorageService.getToken();
        const roles = this.tokenStorageService.getAuthorities();
        if (token && roles.includes('ADMIN')) {
            return true;
        }
        this.messageService.sendMessage(new Message(`Path access denied: ${state.url}`, MessageType.DANGER));
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService,
        private messageService: MessageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenStorageService.getToken();
        if (token) {
            return true;
        }
        this.messageService.sendMessage(new Message(`Path access denied: ${state.url}`, MessageType.DANGER));
        return false;
    }
}

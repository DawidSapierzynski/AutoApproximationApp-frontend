import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenStorageService } from '../service/auth/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardUser implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenStorageService.getToken();
        const roles = this.tokenStorageService.getAuthorities();
        if (token && roles.includes('USER')) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthGuardAdmin implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenStorageService.getToken();
        const roles = this.tokenStorageService.getAuthorities();
        if (token && roles.includes('ADMIN')) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenStorageService.getToken();
        if (token) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

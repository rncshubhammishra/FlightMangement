import { Inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,@Inject(SESSION_STORAGE) private storage: StorageService) {}

    canActivate() {
        debugger;
        if (this.storage.get("isLogedIn")) {
            return true;
        }
       
            this.router.navigate(['/login']);
            return false;
       

   
    }
}
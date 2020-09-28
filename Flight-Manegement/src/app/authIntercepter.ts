import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Injectable, Injector,Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    currentValue: any;
    loginUrl: string;
    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
       var authReq:any;


  
       if(req.url.includes("Authenticate") ){
             authReq = req.clone();
       }
       else{
              this.currentValue = this.storage.get("acessToken");
               if (this.currentValue) {
                this.currentValue = 'bearer ' +this.currentValue;
                authReq = req.clone({ headers: req.headers.set('Authorization', this.currentValue) });
              } 
              else{
                authReq = req.clone();
              }
                          
       }
        return next.handle(authReq)
            .pipe(catchError((error, caught) => {
                console.log("Error Occurred");
                console.log(error);
                return throwError(error);
            })) as any;
    }


}
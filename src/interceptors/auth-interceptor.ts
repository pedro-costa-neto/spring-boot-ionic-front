import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    basePath = API_CONFIG.baseUrlProxy;

    constructor(
        public storage: StorageService,
        public _platform: Platform
    ){
        if(this._platform.is("cordova")){
            this.basePath = API_CONFIG.baseUrl;
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let n = this.basePath.length;
        let requestToApi = req.url.substr(0, n) == this.basePath;

        console.log(localUser && requestToApi, localUser, req.url.substr(0, n));
        if(localUser && requestToApi){
            const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${localUser.token}`)});
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
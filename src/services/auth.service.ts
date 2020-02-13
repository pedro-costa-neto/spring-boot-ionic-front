import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Platform } from "ionic-angular";

@Injectable()
export class AuthService {

    basePath = "/serverapi";

    constructor(
        public http: HttpClient,
        private _platform: Platform
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${this.basePath}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }
}
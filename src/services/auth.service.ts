import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Platform } from "ionic-angular";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    basePath = "/serverapi";

    constructor(
        public http: HttpClient,
        private _platform: Platform,
        public storageServer: StorageService
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${this.basePath}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfullLogin(authorizationValue: String) {
        let token = authorizationValue.substring(7);
        let user : LocalUser = {
            token: token
        };
        
        this.storageServer.setLocalUser(user);
    }

    logout() {
        this.storageServer.setLocalUser(null);
    }
}
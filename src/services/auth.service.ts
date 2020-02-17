import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Platform } from "ionic-angular";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();
    basePath = API_CONFIG.baseUrlProxy;

    constructor(
        public http: HttpClient,
        public storageServer: StorageService,
        private _platform: Platform
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
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        
        this.storageServer.setLocalUser(user);
    }

    logout() {
        this.storageServer.setLocalUser(null);
    }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Platform } from "ionic-angular";

@Injectable()
export class ClienteService {
    
    basePath = '/serverapi';

    constructor(
        public http: HttpClient,
        private _platform: Platform,
        public storage: StorageService
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }

    findbyEmail(email: String) : Observable<ClienteDTO>{

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': `Bearer ${token}`});

        return this.http.get<ClienteDTO>(
            `${this.basePath}/clientes/email?value=${email}`,
            {headers: authHeader}
            );
    }
}
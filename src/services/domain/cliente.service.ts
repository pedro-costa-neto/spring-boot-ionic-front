import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

    findbyId(id: string) {
        return this.http.get(`${this.basePath}/clientes/${id}`);
    }

    findbyEmail(email: String) {
        return this.http.get(`${this.basePath}/clientes/email?value=${email}`);
    }

    insert(obj: ClienteDTO) {
        return this.http.post(
            `${this.basePath}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
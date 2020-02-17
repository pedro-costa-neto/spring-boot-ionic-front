import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';

import { API_CONFIG } from '../../config/api.config';
import { CidadeDTO } from '../../models/cidade.dto';

@Injectable()
export class CidadeService {

    basePath = API_CONFIG.baseUrlProxy;
    
    constructor(
        public http: HttpClient,
        private _platform: Platform
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }

    findAll(estado_id: String) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${this.basePath}/estados/${estado_id}/cidades`);
    }
}
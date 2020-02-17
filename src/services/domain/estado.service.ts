import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';

import { API_CONFIG } from '../../config/api.config';
import { EstadoDTO } from '../../models/estado.dto';

@Injectable()
export class EstadoService {

    basePath = API_CONFIG.baseUrlProxy;
    
    constructor(
        public http: HttpClient,
        private _platform: Platform
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }

    findAll() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${this.basePath}/estados`);
    }
}
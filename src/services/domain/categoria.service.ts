import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { Platform } from 'ionic-angular';

@Injectable()
export class CategoriaService {

    basePath = API_CONFIG.baseUrlProxy;
    
    constructor(
        public http: HttpClient,
        private _platform: Platform
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${this.basePath}/categorias`)
    }
}
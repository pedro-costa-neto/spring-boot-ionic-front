import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';

import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class ProdutoService {

    basePath = API_CONFIG.baseUrlProxy;
    
    constructor(
        public http: HttpClient,
        private _platform: Platform
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }

    findByCategoria(categoria_id: string)  {
        return this.http.get(`${this.basePath}/produtos/?categorias=${categoria_id}`);
    }
}
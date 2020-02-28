import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../config/api.config';
import { Platform } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.tdo';

@Injectable()
export class PedidoService {

    basePath = API_CONFIG.baseUrlProxy;
    
    constructor(
        public http: HttpClient,
        private _platform: Platform
        ){

            if(this._platform.is("cordova")){
                this.basePath = API_CONFIG.baseUrl;
            }
    }
    
    insert(obj: PedidoDTO) {
        return this.http.post(
            `${this.basePath}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
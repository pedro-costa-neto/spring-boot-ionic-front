import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEY } from "../config/storege_keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser{
        let user =localStorage.getItem(STORAGE_KEY.localUser);

        if(user == null){
            return null;
        }
        else{
            return JSON.parse(user);
        }
    }

    setLocalUser(obj : LocalUser){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEY.localUser);
        }
        else{
            localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(obj));
        }
    }

    // ==============================================================================
    getCart() : Cart{
        let user =localStorage.getItem(STORAGE_KEY.cart);

        if(user == null){
            return null;
        }
        else{
            return JSON.parse(user);
        }
    }

    setCart(obj : Cart){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEY.cart);
        }
        else{
            localStorage.setItem(STORAGE_KEY.cart, JSON.stringify(obj));
        }
    }
}
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {
    
    constructor(public storage: StorageService) {
    }

    creatOrClearCart() : Cart {
        const cart: Cart = {itens: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();

        if(cart == null) {
            cart = this.creatOrClearCart();
        }

        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);

        if(position == -1) {
            cart.itens.push({
                quantidade: 1,
                produto: produto
            });
        }

        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);

        if(position != -1) {
            cart.itens.splice(position, 1);
        }

        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);

        if(position != -1) {
            cart.itens[position].quantidade++;
        }

        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.id == produto.id);

        if(position != -1) {
            cart.itens[position].quantidade--;

            if(cart.itens[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }

        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        const cart = this.getCart();
        let sum = 0;

        for(const item of cart.itens){
            sum += item.produto.preco * item.quantidade;
        }

        return sum;
    }
}
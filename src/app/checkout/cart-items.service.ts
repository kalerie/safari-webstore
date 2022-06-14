import {Injectable} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CartItem } from '../common/interfaces/cart-item.interface';

@Injectable({
    providedIn: 'root'
})
export class CartItemsService {
    cartUpdated = new Subject<void>();

    private cart: CartItem[] = [];
    // [
    //     {
    //         id: 1,
    //         productId: '1',
    //         title: 'Casual flat loafers',
    //         price: '19999',
    //         imageUrl: 'https://cdn.shopify.com/s/files/1/0019/4776/2747/products/Womens-Casual-Shoes-Brown-Loafers-Lace-up-Flats-MN0312-Touchy-Style-2.jpg',
    //         quantity: 10,
    //         subTotal: 19999
    //     },
    //     {
    //         id: 2,
    //         productId: '1',
    //         title: 'Casual flat loafers',
    //         price: '19999',
    //         imageUrl: 'https://cdn.shopify.com/s/files/1/0019/4776/2747/products/Womens-Casual-Shoes-Brown-Loafers-Lace-up-Flats-MN0312-Touchy-Style-2.jpg',
    //         quantity: 1,
    //         subTotal: 19999
    //     },
    // ] ;

    checkLocalStorageAndPopulateData() {
        const localCartItems = localStorage.getItem('cart');
        if(localCartItems === null) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(localCartItems);
        }
    }

    getItems() {
        return this.cart;
    }

    addItem(item: CartItem) {
        if(this.cart.some(el => el.productId == item.productId)) {
            this.itemQuantityIncrease(item.productId);
        } else {
            this.cart.push(item);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
        this.cartUpdated.next();
    }

    // updateItem() {
    //     localStorage.setItem('cart', JSON.stringify(this.cart));
    // }

    removeItem(itemId: number) {
        let remainArr = this.cart.filter(el => el.productId !== itemId);
        this.cart = remainArr;
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    itemQuantityDecrease(itemId: number) {
        let quantityDecrease = this.cart
            .find(el => el.productId === itemId);
        quantityDecrease!.quantity--;
        if(quantityDecrease!.quantity <=0) {
            this.removeItem(itemId);
            this.countCartTotal();
        } else {
            this.itemSubTotalUpdate(quantityDecrease!);
            this.countCartTotal();
        }
        
    }

    itemQuantityIncrease(itemId: number) {
        let quantityIncrease = this.cart
            .find(el => el.productId === itemId);
        quantityIncrease!.quantity++;
        this.itemSubTotalUpdate(quantityIncrease!);
        this.countCartTotal();
    }

    itemSubTotalUpdate(item: CartItem) {
        item.subTotal = item.quantity * item.price;
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    countCartTotal() {
        return this.cart.map(el => el.subTotal).reduce((a, b) => a + b, 0);
    }

    countItemsAmount() {
        let sum = this.cart.map(el => el.quantity).reduce((a, b) => a + b, 0);
        return sum;
    }

    
    
}

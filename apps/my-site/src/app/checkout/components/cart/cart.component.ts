import { Component, OnInit } from '@angular/core';
import { CartItemsService } from '../../cart-items.service';
import { CartItem } from '@safari-store/api-interfaces';

@Component({
  selector: 'checkout-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems:CartItem[] = [];
  cartTotal:number = 0;

  constructor(private cartItemsService: CartItemsService) {  }

  ngOnInit(): void {
    this.refreshCartData();
  }

  refreshCartData() {
    this.cartItems = this.cartItemsService.getItems();
    this.cartTotal = this.cartItemsService.countCartTotal();
    this.cartItemsService.cartUpdated.next();
  }

  itemQuantityDecrease(data: CartItem) {
    // this.cartItemsService.itemQuantityDecrease(this.item.productId);
    this.cartItemsService.itemQuantityDecrease(data.productId);
    this.refreshCartData();
  }

  itemQuantityIncrease(data: CartItem) {
    this.cartItemsService.itemQuantityIncrease(data.productId);
    this.refreshCartData();
  }

  removeItem(data: CartItem) {
    this.cartItemsService.removeItem(data.productId);
    this.refreshCartData();
  }

}

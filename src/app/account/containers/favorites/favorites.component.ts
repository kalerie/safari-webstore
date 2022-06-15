import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/interfaces/cart-item.interface';
import { CartItemsService } from 'src/app/checkout/cart-items.service';
import { AccountService } from '../../account.service';
import { Favorit } from '../../../common/interfaces/favorit.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Favorit[] = [];
  isLoading: boolean = true;

  constructor(
    private accountService: AccountService,
    private cartItemService: CartItemsService
  ) { }

  ngOnInit(): void {
    this.refreshCartData();
  }

  refreshCartData() {
    this.accountService.getFavoritesByUserId().subscribe((arr) => {
      this.favorites = arr;
      this.isLoading = false;
    });
  }

  removeFavorite(item: Favorit) {
    this.isLoading = true;
    this.accountService.removeFavorite(item.id as number).subscribe(() => {
      this.refreshCartData();
    });
  }

  addToCart(item: Favorit) {
    const cartItem: CartItem = {
      title: item.product!.title,
      productId: item.product?.id as number,
      price: item.product?.price as number,
      imageUrl: item.product!.imageUrl,
      quantity: 1,
      subTotal: item.product!.price
    }
    this.cartItemService.addItem(cartItem);
    
  }

}

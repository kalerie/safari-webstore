import { Component, OnInit } from '@angular/core';
import { CartItemsService } from '../../../checkout/cart-items.service';
import { CartItem } from '../../../common/interfaces/cart-item.interface';
import { AccountService } from '../../account.service';
import { Favorit } from '../../../common/interfaces/favorit.interface';


@Component({
  selector: 'account-favorites',
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
      productId: item.product?._id as string,
      price: item.product?.price as number,
      imageUrl: item.product!.imageUrl,
      quantity: 1,
      subTotal: item.product!.price
    }
    this.cartItemService.addItem(cartItem);
    
  }

}

import { Component, OnInit } from '@angular/core';
import { CartItemsService } from '../../../checkout/cart-items.service';
import { AccountService } from '../../account.service';
import { CartItem, Product } from '@safari-store/api-interfaces';

@Component({
  selector: 'account-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private accountService: AccountService,
    private cartItemService: CartItemsService
  ) { }

  ngOnInit(): void {
    this.refreshCartData();
  }

  refreshCartData() {
    this.accountService.getUserFavorites().subscribe((arr) => {
      this.favorites = arr;
      this.isLoading = false;
    });
  }

  removeFavorite(id: string) {
    this.isLoading = true;
    this.accountService.removeFavorite(id).subscribe(() => {
      this.refreshCartData();
    });
  }

  addToCart(item: any) {
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

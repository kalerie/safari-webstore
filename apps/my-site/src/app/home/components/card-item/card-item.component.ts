import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemsService } from '../../../checkout/cart-items.service';
import { DialogService } from '../../../common/services/dialog-service/dialogService.service';
import { NotificationService } from '../../../common/services/notification.service';
import { MiniCartComponent } from '../mini-cart/mini-cart.component';
import { CartItem, Product } from '@safari-store/api-interfaces';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() product!: Product;
  isUserAuthenticated: boolean = false;
  @Input() currentUser!: boolean;
  @Output() favouriteClick = new EventEmitter()

  constructor(
    private cartItemService: CartItemsService,
    private notifyService: NotificationService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {

  }

  addToCart() {
    const cartItem: CartItem = {
      title: this.product.title,
      productId: this.product._id,
      price: this.product.price,
      imageUrl: this.product.imageUrl,
      quantity: 1,
      subTotal: this.product.price
    };
    this.cartItemService.addItem(cartItem);
    this.notifyService.showSuccess('Product was added successfully');

    const dialogRef = this.dialog.open(MiniCartComponent);
  }

  addToFavorites() {
    this.favouriteClick.emit(this.product._id);
  }

}

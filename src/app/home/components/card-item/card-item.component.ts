import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product.interface';
import { CartItem } from 'src/app/common/interfaces/cart-item.interface';
import { CartItemsService } from 'src/app/checkout/cart-items.service';
import { MiniCartComponent } from 'src/app/home/components/mini-cart/mini-cart.component';
import { DialogService } from 'src/app/common/services/dialog-service/dialogService.service';
import { NotificationService } from 'src/app/common/services/notification.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() product!: Product;
  isUserAuthenticated: boolean = false;
  @Input() currentUser!: boolean;
  @Output() favouriteClick = new EventEmitter()

  constructor(private cartItemService: CartItemsService,
    private notifyService: NotificationService,
    private dialog: DialogService) { }

  ngOnInit(): void {
    
  }

  addToCart() {
    const cartItem: CartItem = {
      title: this.product.title,
      productId: this.product.id as number,
      price: this.product.price,
      imageUrl: this.product.imageUrl,
      quantity: 1,
      subTotal: this.product.price
    };
    this.cartItemService.addItem(cartItem);
    this.notifyService.showSuccess('Product was added successfully');

    const dialogRef = this.dialog.open(MiniCartComponent);
    // dialogRef.afterClosed().subscribe();

  }

  addToFavorites() {
    this.favouriteClick.emit(this.product.id);
  }

}

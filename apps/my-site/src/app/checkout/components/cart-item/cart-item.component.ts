import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemsService } from '../../cart-items.service';
import { CartItem } from '@safari-store/api-interfaces';

@Component({
  selector: 'checkout-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItem;
  @Output() remove = new EventEmitter();
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();

  constructor(private cartItemsService: CartItemsService) { }

  ngOnInit(): void {
  }

  itemQuantityDecrease() {
    this.decrease.emit();
  }

  itemQuantityIncrease() {
    this.increase.emit();
  }

  removeItem() {
    this.remove.emit();
  }



}

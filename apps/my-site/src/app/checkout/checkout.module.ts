import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

const checkoutRouter: Routes = [
  {
    path: 'cart',
    data: {type: 'cart'},
    component: CartComponent
  },
  {
    path: 'order',
    component: OrderComponent,
    data: {type: 'update'},
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cart'
  }
]

@NgModule({
  declarations: [
    CheckoutComponent,
    OrderComponent,
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(checkoutRouter),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    
  ]
})
export class CheckoutModule { }

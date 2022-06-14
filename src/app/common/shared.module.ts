import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavArrowComponent } from '../home/components/nav-arrow/nav-arrow.component';
import { MiniCartItemComponent } from '../home/components/mini-cart-item/mini-cart-item.component';
import { MiniCartComponent } from '../home/components/mini-cart/mini-cart.component';


@NgModule({
    declarations: [
      NavArrowComponent,
      MiniCartItemComponent,
      MiniCartComponent
    ],
    imports: [
      RouterModule
    ],
    exports: [
      NavArrowComponent,
      MiniCartItemComponent,
      MiniCartComponent
    ]
  })
  export class SharedModule { }
  
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavArrowComponent } from '../home/components/nav-arrow/nav-arrow.component';
import { MiniCartItemComponent } from '../home/components/mini-cart-item/mini-cart-item.component';
import { MiniCartComponent } from '../home/components/mini-cart/mini-cart.component';
import { SearchFilterPipe } from "./search-filter.pipe";
import { DictionaryPipe } from "./dictionary.pipe";


@NgModule({
    declarations: [
      NavArrowComponent,
      MiniCartItemComponent,
      MiniCartComponent,
      SearchFilterPipe,
      DictionaryPipe
    ],
    imports: [
      RouterModule
    ],
    exports: [
      NavArrowComponent,
      MiniCartItemComponent,
      MiniCartComponent,
      SearchFilterPipe,
      DictionaryPipe
    ]
  })
  export class SharedModule { }
  
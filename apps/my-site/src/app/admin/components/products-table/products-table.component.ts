import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { buildLabelValueMap, LabelValueEntry } from '../../../common/label-value-map';
import { ProductCategory, ProductCategoryLabel } from '../../../common/product-category.enum';
import { ProductType, ProductTypeLabel } from '../../../common/product-type.enum';
import { CardService } from '../../card.service';
import { Product } from '@safari-store/api-interfaces';
import { Store } from '@ngrx/store';
import { getProducts } from '../../../store/selectors/products-table.selector';
import { loadProducts, removeProduct } from '../../../store/actions/products-table.actions';


@Component({
  selector: 'admin-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  // cards: Product[] = [];
  titles = ['#','Title', 'Price', 'Type', 'Category','ImageUrl'];
  highlightRow!: string;
  public dictionary: any = '';
  categories: LabelValueEntry[] = buildLabelValueMap(ProductCategoryLabel, ProductCategory);
  types: LabelValueEntry[] = buildLabelValueMap(ProductTypeLabel, ProductType);

  cards$ = this.store.select(getProducts);

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    this.subscribeRouteChange();
    // this.subscribeDataShouldUpdate();
  }

  subscribeRouteChange() {
    this.cardService.routeChange.subscribe((id) => {
      this.highlightRow = id;
    });
  }

  // subscribeDataShouldUpdate() {
  //   this.cardService.updateChange.subscribe({
  //     next: () => {
  //       // this.cardService.getCards().subscribe((cards) => (this.cards = cards))
  //     }
  //   });
  // }

  selectRow(index: string) {
    this.highlightRow = index;
    this.router.navigate(['/admin/products/', index]);
  }

  newCardForm() {
    this.router.navigate(['/admin/products/new']);
  }

  deleteCard(card: Product, event: Event) {
    this.store.dispatch(removeProduct({ _id: card._id }));
    event.stopPropagation();
  }

}

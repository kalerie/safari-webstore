import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CardService } from '../../../admin/card.service';
import { ColorService } from '../../../admin/color.service';
import { SizeService } from '../../../admin/size.service';
import { PRICE_RANGES } from '../../../common/constants/price-range-constant';
import { Color } from '../../../common/interfaces/color.interface';
import { Product } from '../../../common/interfaces/product.interface';
import { Size } from '../../../common/interfaces/size.interface';
import { buildLabelValueMap, LabelValueEntry } from '../../../common/label-value-map';
import { ClothesCategory, ClothesCategoryLabel } from '../../../common/product-category.enum';


@Component({
  selector: 'home-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent implements OnInit {
  products: Product[] = [];
  sizes: Size[] = [];
  colors: Color[] = [];
  isLoading: boolean = true;
  highlightCategory!: string;
  categories: LabelValueEntry[] = buildLabelValueMap(ClothesCategoryLabel, ClothesCategory);
  httpParams = new HttpParams().set('type', 'clothes');

  priceRadioControl = new FormControl();
  priceFromInput = new FormControl();
  priceToInput = new FormControl();
  sortingOrderSelect = new FormControl();

  constructor(
    private cardService: CardService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.parseQuery();
    this.fetchData();
  }

  parseQuery(){
    // parse category
    if(this.route.snapshot.queryParamMap.get('category')) {
      this.highlightCategory = this.route.snapshot.queryParamMap.get('category') as string;
      this.httpParams = this.httpParams.set('category', this.highlightCategory);
    } else {
        this.highlightCategory = '';
      }
    // parse price
    let from = this.route.snapshot.queryParamMap.get('price_gte');
    let to = this.route.snapshot.queryParamMap.get('price_lte');
    if(from !== null && to !== null) {
      let keyToCompare = `${from},${to}`;
      if(keyToCompare in PRICE_RANGES){
        this.priceRadioControl.setValue(keyToCompare);
      } else {
          this.priceFromInput.setValue(from);
          this.priceToInput.setValue(to);
        }
      this.httpParams = this.httpParams.set('price_gte', from!).set('price_lte', to!);
    } else if(from !== null ) {
        this.priceFromInput.setValue(from);
        this.httpParams = this.httpParams.set('price_gte', from!);
      } else if(to !== null) {
          this.priceToInput.setValue(to);
          this.httpParams = this.httpParams.set('price_lte', to!);
        }
    // parce sorting
    if(this.route.snapshot.queryParamMap.get('_sort') == 'id' && this.route.snapshot.queryParamMap.get('_order') == 'asc' ) {
      this.sortingOrderSelect.setValue('recommended');
      this.httpParams = this.httpParams.set('_sort', 'id');
      this.httpParams = this.httpParams.set('_order', 'asc');
    } else if(this.route.snapshot.queryParamMap.get('_sort') == 'id' && this.route.snapshot.queryParamMap.get('_order') == 'desc' ) {
        this.sortingOrderSelect.setValue('latest');
        this.httpParams = this.httpParams.set('_sort', 'id');
        this.httpParams = this.httpParams.set('_order', 'desc');
      } else if (this.route.snapshot.queryParamMap.get('_sort') == 'price' && this.route.snapshot.queryParamMap.get('_order') == 'asc' ) {
          this.sortingOrderSelect.setValue('low-price');
          this.httpParams = this.httpParams.set('_sort', 'price');
          this.httpParams = this.httpParams.set('_order', 'asc');
        } else if (this.route.snapshot.queryParamMap.get('_sort') == 'price' && this.route.snapshot.queryParamMap.get('_order') == 'desc' ) {
            this.sortingOrderSelect.setValue('high-price');
            this.httpParams = this.httpParams.set('_sort', 'price');
            this.httpParams = this.httpParams.set('_order', 'desc');
          } else {
            this.sortingOrderSelect.setValue('recommended');
            }
  }

  fetchData() {
    forkJoin([
      this.colorService.getColors(),
      this.sizeService.getSizes(),
      this.cardService.getCards(this.httpParams)
    ])
    .subscribe(([colors, sizes, products]) => {
      this.colors = colors;
      this.sizes = sizes;
      this.products = products;
      this.isLoading = false;
    });
  }

  fetchProducts() {
    this.isLoading = true;
    this.cardService.getCards(this.httpParams).subscribe((cards) => {
      this.products = cards;
      this.isLoading = false;
    });
  }

  navigateWithFiltersInQuery() {
    const queryParams: any = {};
    // category
    if(this.highlightCategory){
      queryParams.category = this.highlightCategory;
    } 
    // price
    if((this.priceFromInput.value && this.priceToInput.value) || this.priceRadioControl.value) {
      if(this.priceRadioControl.value in PRICE_RANGES){
        let [from, to] = this.priceRadioControl.value.split(",");
        queryParams.price_gte = from;
        queryParams.price_lte = to;
      } else {
          queryParams.price_gte = this.priceFromInput.value;
          queryParams.price_lte = this.priceToInput.value;
        }
    } else if(this.priceFromInput.value) {
        queryParams.price_gte = this.priceFromInput.value;
      } else if(this.priceToInput.value) {
          queryParams.price_lte = this.priceToInput.value;
        }
    // sorting
    if(this.sortingOrderSelect.value == 'recommended') {
      queryParams._sort = 'id';
      queryParams._order = 'asc';
    } else if (this.sortingOrderSelect.value == 'latest') {
        queryParams._sort = 'id';
        queryParams._order = 'desc';
      } else if (this.sortingOrderSelect.value == 'low-price') {
          queryParams._sort = 'price';
          queryParams._order = 'asc';
        } else if (this.sortingOrderSelect.value == 'high-price') {
            queryParams._sort = 'price';
            queryParams._order = 'desc';
          }
    this.router.navigate(['/clothes'], { queryParams });
  }

  goCategory(category: string) {
    this.highlightCategory = category;
    if(category) {
      this.httpParams = this.httpParams.set('category', this.highlightCategory);
    } else {
        this.httpParams = this.httpParams.delete('category');
      }
    this.navigateWithFiltersInQuery();
    this.fetchProducts();
  }

  priceFilterChange(from?: number, to?: number) {
    if(from !== null && to !== null) {
      let keyToCompare = `${from},${to}`;
      if(Object.keys(PRICE_RANGES).some(key => key == keyToCompare)){
        this.priceRadioControl.setValue(keyToCompare);
        this.priceFromInput.setValue('');
        this.priceToInput.setValue('');
      } else {
          this.priceFromInput.setValue(from);
          this.priceToInput.setValue(to);
          this.priceRadioControl.setValue('');
        } 
      this.httpParams = this.httpParams.set('price_gte', from!).set('price_lte', to!);
    } else if(from !== null ) {
        this.priceFromInput.setValue(from);
        this.priceToInput.setValue('');
        this.priceRadioControl.setValue('');
        this.httpParams = this.httpParams.set('price_gte', from!);
      } else if(to !== null) {
          this.priceToInput.setValue(to);
          this.priceFromInput.setValue('');
          this.priceRadioControl.setValue('');
          this.httpParams = this.httpParams.set('price_lte', to!);
        } else {
          this.removePriceFilter();
          }
    this.navigateWithFiltersInQuery();
    this.fetchProducts();
  }

  removePriceFilter() {
    this.httpParams = this.httpParams.delete('price_lte').delete('price_gte');
    this.priceFromInput.setValue('');
    this.priceToInput.setValue('');
    this.priceRadioControl.setValue('');
    this.navigateWithFiltersInQuery();
    this.fetchProducts();
  }

  sortCards(value: string) {
    this.sortingOrderSelect.setValue(value);
    if(value == 'recommended') {
      this.httpParams = this.httpParams.set('_sort', 'id');
      this.httpParams = this.httpParams.set('_order', 'asc');
    } else if (value == 'latest') {
      this.httpParams = this.httpParams.set('_sort', 'id');
      this.httpParams = this.httpParams.set('_order', 'desc');
      } else if (value == 'low-price') {
        this.httpParams = this.httpParams.set('_sort', 'price');
        this.httpParams = this.httpParams.set('_order', 'asc');
        } else if (value == 'high-price') {
            this.httpParams = this.httpParams.set('_sort', 'price');
            this.httpParams = this.httpParams.set('_order', 'desc');
          }
    this.navigateWithFiltersInQuery();
    this.fetchProducts();
  }

}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/admin/card.service';
import { ColorService } from 'src/app/admin/color.service';
import { SizeService } from 'src/app/admin/size.service';
import { Color } from 'src/app/common/interfaces/color.interface';
import { Product } from 'src/app/common/interfaces/product.interface';
import { Size } from 'src/app/common/interfaces/size.interface';
import { buildLabelValueMap, LabelValueEntry } from 'src/app/common/label-value-map';
import { ClothesCategory, ClothesCategoryLabel } from 'src/app/common/product-category.enum';

const PRICE_RANGES = {
  '0,10000' : '0,10000',
  '10000,20000' : '10000,20000',
  '20000,50000' : '20000,50000',
  '50000,100000' : '50000,100000',
  '100000,200000' : '100000,200000'
}

@Component({
  selector: 'app-clothes',
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

  constructor(
    private cardService: CardService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getColors();
    this.getSizes();
    this.parseQuery();
    this.fetchData();
  }

  getColors() {
    this.colorService.getColors().subscribe(colors => this.colors = colors);
  }

  getSizes() {
    this.sizeService.getSizes().subscribe(sizes => this.sizes = sizes);
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
    if(Number(from) >= 0 && Number(to) > 0) {
      let keyToCompare = `${from},${to}`;
      if(Object.keys(PRICE_RANGES).some(key => key == keyToCompare)){
        this.priceRadioControl.setValue(to);
      } else {
        this.priceFromInput.setValue(from);
        this.priceToInput.setValue(to);
      }
      this.httpParams = this.httpParams.set('price_gte', from!).set('price_lte', to!);
    } else if(Number(from) >= 0) {
      this.priceFromInput.setValue(from);
      this.httpParams = this.httpParams.set('price_gte', from!);
      } else if(Number(to) > 0) {
      this.priceFromInput.setValue(to);
      this.httpParams = this.httpParams.set('price_lte', to!);
      }
    
  }

  fetchData() {
    this.cardService.getClothesCards(this.httpParams).subscribe((cards) => {
      this.products = cards;
      this.isLoading = false;
    });
  }

  goCategory(category: string) {
    this.isLoading = true;
    this.highlightCategory = category;

    if(this.priceRadioControl.value || this.priceFromInput.value || this.priceToInput.value) {
      let from = this.route.snapshot.queryParamMap.get('price_gte');
      let to = this.route.snapshot.queryParamMap.get('price_lte');
      this.httpParams = this.httpParams.set('price_gte', from!).set('price_lte', to!);
      
      if(category){
        this.httpParams = this.httpParams.set('category', category);
        this.router.navigate(['/clothes'], { queryParams: { category: category, price_gte: from, price_lte: to } });
      } else {
        this.httpParams = this.httpParams.delete('category');
        this.router.navigate(['/clothes'], { queryParams: { price_gte: from, price_lte: to } });
      }
    } else {
      if(category){
        this.httpParams = this.httpParams.set('category', category);
        this.router.navigate(['/clothes'], { queryParams: { category: category } });
      } else {
        this.httpParams = this.httpParams.delete('category');
        this.router.navigate(['/clothes']);
      }
    }

    this.fetchData();
    

  }


  priceFilterChange(from: number, to: number) {
    this.isLoading = true;
    console.log(from, to);
    this.httpParams = this.httpParams.set('price_gte', from).set('price_lte', to);
    
    if(this.highlightCategory) {
      this.httpParams = this.httpParams.set('category', this.highlightCategory);
      this.router.navigate(['/clothes'], { queryParams: { category: this.highlightCategory, price_gte: from, price_lte: to } });
    }else {
      this.router.navigate(['/clothes'], { queryParams: {price_gte: from, price_lte: to } });
    }
    
    this.cardService.getClothesCards(this.httpParams).subscribe((cards) => {
      this.products = cards;

      if(this.route.snapshot.queryParamMap.get('price_lte')) {
        let from = this.route.snapshot.queryParamMap.get('price_gte');
        let to = this.route.snapshot.queryParamMap.get('price_lte');
        let keyToCompare = `${from},${to}`;
        if(Object.keys(PRICE_RANGES).some(key => key == keyToCompare)){
          this.priceRadioControl.setValue(to);
          this.priceFromInput.setValue('');
          this.priceToInput.setValue('');
        } else {
          this.priceFromInput.setValue(from);
          this.priceToInput.setValue(to);
          this.priceRadioControl.setValue('');
        }
      }
      this.isLoading = false;
    })

  }



  
}

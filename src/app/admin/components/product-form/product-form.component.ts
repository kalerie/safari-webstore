import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../common/interfaces/product.interface';
import { CardService } from '../../card.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { FormType } from 'src/app/common/form-type.enum';
import { Color } from 'src/app/common/interfaces/color.interface';
import { ColorService } from '../../color.service';
import { forkJoin, of, switchMap, zip } from 'rxjs';
import { ProductsColors } from 'src/app/common/interfaces/products-colors.interface';
import { Size } from 'src/app/common/interfaces/size.interface';
import { SizeService } from '../../size.service';
import { ProductsSizes } from 'src/app/common/interfaces/products-sizes.interface';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isLoading: boolean = true;
  newCardForm!: FormGroup;
  cardId?: number;
  public formTypeEnum = FormType;
  public routeType = this.route.snapshot.data['type'];
  colors: Color[] = [];
  selectedColors: Color[] = [];
  sizes: Size[] = [];
  selectedSizes: Size[] = [];
  

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    public route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private colorService: ColorService,
    private sizeService: SizeService
  ) {
      
  }

  ngOnInit(): void {
    this.subscribeRouteParamsChange();
    this.initForm();
  }

  colorChange(event: Color[]) {
    this.selectedColors = event;
  }

  sizeChange(event: Size[]) {
    this.selectedSizes = event;
  }

  initForm() {
    this.newCardForm =  this.fb.group({
      title: '',
      price: '',
      imageUrl: ''
    })
    this.isLoading = false;
  }

  subscribeRouteParamsChange() {
    this.route.params.subscribe((params) => {
      this.cardService.routeChange.next(params['id']);
      if (params['id']) {
        this.cardId = Number(params['id']);
        this.getCardAndPatchForm(params['id']);
      }
    });
    
  }

  updateCard(card: Product) {
    this.cardService.updateCard(card, this.cardId as number)
      .pipe(
        switchMap((obj) => {
          let arr = [];
          if(this.selectedColors.length > 0) {
            let productColors: ProductsColors[] = this.selectedColors.map(el => ({
              productId: this.cardId as number,
              colorId: el.id as number
            }));
            arr.push(this.cardService.setProductsColors(productColors, this.cardId as number))
              
          }
          if(this.selectedSizes.length > 0) {
            let productSizes: ProductsSizes[] = this.selectedSizes.map(el => ({
              productId: this.cardId as number,
              sizeId: el.id as number
            }));
            arr.push(this.cardService.setProductsSizes(productSizes, this.cardId as number))
          }
          if(arr.length > 0) {
            return forkJoin(arr);
          } else {
            return of([])
          }
    })
      ).subscribe(() => {
      this.cardService.updateChange.next();
      this.notifyService.showSuccess('Card was updated');
    });
  }
 
  getCardAndPatchForm(id: number) {
    this.cardService.getCard(id)
      .pipe(switchMap(card => {
          return zip(this.cardService.getProductColorsByProductId(id), of(card), this.colorService.getColors(), this.sizeService.getSizes(), this.cardService.getProductSizesByProductId(id))
        })).subscribe(([productColors, card, colors, sizes, productSizes]) => {
          this.patchForm(productColors, card, colors, sizes, productSizes);
        })
  }

  patchForm(productColors: Color[], card: any, colors: Color[], sizes: Size[], productSizes: Size[]) {
    this.newCardForm.patchValue({
      title: card.title,
      price: card.price,
      imageUrl: card.imageUrl
    })
      this.selectedColors = productColors.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      this.colors = colors.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      this.selectedSizes = productSizes.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      this.sizes = sizes.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      this.isLoading = false;
  }

  addCard(card: Product) {
    this.cardService.addCard(card).subscribe(() => {
      this.cardService.updateChange.next();
      this.newCardForm.reset();
      this.notifyService.showSuccess('Card was added');
    });
  }

  submit(): void {
    const card = this.newCardForm.value;
    if(this.routeType === this.formTypeEnum.CREATE) {
      this.addCard(card);
    } else {
       this.updateCard(card);
      }
  }

  cancel(){
    this.router.navigate(['/admin/products']);
  }

}

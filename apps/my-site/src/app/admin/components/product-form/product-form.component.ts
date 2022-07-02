import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../card.service';
import { ColorService } from '../../color.service';
import { of, switchMap, zip } from 'rxjs';
import { SizeService } from '../../size.service';
import { FormType } from '../../../common/form-type.enum';
import { NotificationService } from '../../../common/services/notification.service';
import { CreateProductDto, DictionaryEntity, Product, UpdateProductDto } from '@safari-store/api-interfaces';
import { buildLabelValueMap, LabelValueEntry } from '../../../common/label-value-map';
import { ProductType, ProductTypeLabel } from '../../../common/product-type.enum';
import {
  AccessoriesCategory,
  AccessoriesCategoryLabel,
  ClothesCategory,
  ClothesCategoryLabel,
  ShoesCategory,
  ShoesCategoryLabel
} from '../../../common/product-category.enum';
import { Store } from '@ngrx/store';
import { addProduct, updateProduct } from '../../../store/actions/products-table.actions';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isLoading: boolean = true;
  newCardForm!: FormGroup;
  cardId?: string;
  public formTypeEnum = FormType;
  public routeType = this.route.snapshot.data['type'];
  colors: DictionaryEntity[] = [];
  selectedColors: DictionaryEntity[] = [];
  sizes: DictionaryEntity[] = [];
  selectedSizes: DictionaryEntity[] = [];
  types: LabelValueEntry[] = buildLabelValueMap(ProductTypeLabel, ProductType);
  categories: LabelValueEntry[] = [];


  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    public route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.subscribeRouteParamsChange();
    this.initForm();
  }

  onTypeSelected(type: string) {
    if(type === 'clothes') {
      this.categories = buildLabelValueMap(ClothesCategoryLabel, ClothesCategory);
    } else if(type === 'shoes') {
      this.categories = buildLabelValueMap(ShoesCategoryLabel, ShoesCategory);
    } else if(type === 'accessories') {
      this.categories = buildLabelValueMap(AccessoriesCategoryLabel, AccessoriesCategory);
    }
    this.categories = this.categories.filter(c => c.label !== 'All');

  }

  colorChange(event: DictionaryEntity[]) {
    this.selectedColors = event;
    let colors = this.selectedColors.map(col => col._id);
    this.newCardForm.controls['colors'].setValue(colors);
  }

  sizeChange(event: DictionaryEntity[]) {
    this.selectedSizes = event;
    let sizes = this.selectedSizes.map(size => size._id);
    this.newCardForm.controls['sizes'].setValue(sizes);
  }

  initForm() {
    this.newCardForm =  this.fb.group({
      title: '',
      price: '',
      type: '',
      category: '',
      imageUrl: '',
      colors: [],
      sizes: []
    })
    this.isLoading = false;
  }

  subscribeRouteParamsChange() {
    this.route.params.subscribe((params) => {
      this.cardService.routeChange.next(params['id']);
      if (params['id']) {
        this.cardId = params['id'];
        this.getCardAndPatchForm(params['id']);
      } else {
          this.colorService.getColors().subscribe((colors) => (this.colors = colors));
          this.sizeService.getSizes().subscribe((sizes) => (this.sizes = sizes));
        }
    });
  }

  updateCard(card: UpdateProductDto) {
    this.store.dispatch(updateProduct({ product: card, _id: this.cardId as string }));
  }

  getCardAndPatchForm(id: string) {
    this.cardService.getCard(id)
      .pipe(switchMap(card => {
          return zip(of(card), this.colorService.getColors(), this.sizeService.getSizes())
        }))
        .subscribe(([card, colors, sizes]) => {
          this.patchForm(card, colors, sizes);
        })
  }

  patchForm(card: Product, colors: DictionaryEntity[], sizes: DictionaryEntity[]) {
    if(card.type === 'clothes') {
      this.categories = buildLabelValueMap(ClothesCategoryLabel, ClothesCategory);
    } else if(card.type === 'shoes') {
      this.categories = buildLabelValueMap(ShoesCategoryLabel, ShoesCategory);
    } else if(card.type === 'accessories') {
      this.categories = buildLabelValueMap(AccessoriesCategoryLabel, AccessoriesCategory);
    } else {
      this.categories = [];
    }
    if(this.categories.length > 0) {
      this.categories = this.categories.filter(c => c.label !== 'All');
    }

    this.newCardForm.patchValue({
      title: card.title,
      price: card.price,
      type: card.type,
      category: card.category,
      imageUrl: card.imageUrl,
      // colors: card.colors,
      // sizes: card.sizes
    })

    this.selectedColors = card.colors;
    if(this.selectedColors.length > 0) {
      this.selectedColors.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    }
    this.selectedSizes = card.sizes;
    if(this.selectedSizes.length > 0) {
      this.selectedSizes.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    }

    this.colors = colors.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    this.sizes = sizes.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    this.isLoading = false;

    this.cdr.detectChanges();
  }

  addCard(card: CreateProductDto) {
    this.store.dispatch(addProduct({ product: card }));
    this.newCardForm.reset();


    // change later
    this.selectedColors = [];
    this.selectedSizes = [];
    this.colorService.getColors().subscribe((colors) => (this.colors = colors));
    this.sizeService.getSizes().subscribe((sizes) => (this.sizes = sizes));

  }

  submit(): void {
    if(this.selectedColors.length > 0) {
      let colors = this.selectedColors.map(color => color._id);
      this.newCardForm.controls['colors'].setValue(colors);
    } else {
      this.newCardForm.controls['colors'].setValue([]);
    }
    if(this.selectedSizes.length > 0) {
      let sizes = this.selectedSizes.map(size => size._id);
      this.newCardForm.controls['sizes'].setValue(sizes);
    } else {
      this.newCardForm.controls['sizes'].setValue([]);
    }
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

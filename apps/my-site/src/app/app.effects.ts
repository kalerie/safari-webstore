import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardService } from './admin/card.service';
import { ProductsTableState } from './store/states/products-table.state';
import {
  addProduct,
  addProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  removeProduct,
  removeProductSuccess,
  updateProduct,
  updateProductSuccess
} from './store/actions/products-table.actions';
import { Router } from '@angular/router';
import { NotificationService } from './common/services/notification.service';
import { SizeService } from './admin/size.service';
import { ColorService } from './admin/color.service';
import {
  addColor,
  addColorSuccess,
  loadColors,
  loadColorsFailure,
  loadColorsSuccess,
  removeColor,
  removeColorSuccess,
  updateColor,
  updateColorSuccess
} from './store/actions/colors.actions';
import {
  addSize,
  addSizeSuccess,
  loadSizes,
  loadSizesFailure,
  loadSizesSuccess,
  removeSize,
  removeSizeSuccess,
  updateSize,
  updateSizeSuccess
} from './store/actions/sizes.actions';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private productsStore: Store<ProductsTableState>,
    private cardService: CardService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private router: Router,
    private notifyService: NotificationService
  ) {
  }

  // PRODUCTS
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    switchMap(() => from(this.cardService.getCards()).pipe(
      map((products) => loadProductsSuccess({products: products})),
      catchError((error) => of(loadProductsFailure({error})))
    ))
  ));

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    switchMap((action) => {
      return this.cardService.addCard(action.product).pipe(
        map((data) => {

          this.notifyService.showSuccess('Card was added');
          return addProductSuccess({product: data});
        })
      );
    })
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(updateProduct),
    switchMap((action) => {
      return this.cardService.updateCard(action.product, action._id).pipe(
        map((data) => {
          this.notifyService.showSuccess('Card was updated');
          return updateProductSuccess({product: data});
        })
      );
    })
  ));

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeProduct),
      switchMap((action) => {
        return this.cardService.deleteCard(action._id).pipe(
          map((data) => {
            this.router.navigate(['/admin/products']);
            return removeProductSuccess({_id: action._id});
          })
        );
      })
    );
  });


  // COLORS
  loadColors$ = createEffect(() => this.actions$.pipe(
    ofType(loadColors),
    switchMap(() => from(this.colorService.getColors()).pipe(
      map((colors) => loadColorsSuccess({colors: colors})),
      catchError((error) => of(loadColorsFailure({error})))
    ))
  ));

  addColor$ = createEffect(() => this.actions$.pipe(
    ofType(addColor),
    switchMap((action) => {
      return this.colorService.addColor(action.color).pipe(
        map((data) => {
          this.notifyService.showSuccess('Color was added');
          return addColorSuccess({color: data});
        })
      );
    })
  ));

  updateColor$ = createEffect(() => this.actions$.pipe(
    ofType(updateColor),
    switchMap((action) => {
      return this.colorService.updateColor(action.color, action._id).pipe(
        map((data) => {
          this.notifyService.showSuccess('Color was updated');
          return updateColorSuccess({color: data});
        })
      );
    })
  ));

  deleteColor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeColor),
      switchMap((action) => {
        return this.colorService.deleteColor(action._id).pipe(
          map((data) => {
            if(this.router.url == `/admin/colors/${action._id}`){
              this.router.navigate(['/admin/colors']);
            }
            return removeColorSuccess({_id: action._id});
          })
        );
      })
    );
  });


  // SIZES
  loadSizes$ = createEffect(() => this.actions$.pipe(
    ofType(loadSizes),
    switchMap(() => from(this.sizeService.getSizes()).pipe(
      map((sizes) => loadSizesSuccess({sizes: sizes})),
      catchError((error) => of(loadSizesFailure({error})))
    ))
  ));

  addSize$ = createEffect(() => this.actions$.pipe(
    ofType(addSize),
    switchMap((action) => {
      return this.sizeService.addSize(action.size).pipe(
        map((data) => {
          this.notifyService.showSuccess('Size was added');
          return addSizeSuccess({size: data});
        })
      );
    })
  ));

  updateSize$ = createEffect(() => this.actions$.pipe(
    ofType(updateSize),
    switchMap((action) => {
      return this.sizeService.updateSize(action.size, action._id).pipe(
        map((data) => {
          this.notifyService.showSuccess('Size was updated');
          return updateSizeSuccess({size: data});
        })
      );
    })
  ));

  deleteSize$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeSize),
      switchMap((action) => {
        return this.sizeService.deleteSize(action._id).pipe(
          map((data) => {
            if(this.router.url == `/admin/sizes/${action._id}`){
              this.router.navigate(['/admin/sizes']);
            }
            return removeSizeSuccess({_id: action._id});
          })
        );
      })
    );
  });


}

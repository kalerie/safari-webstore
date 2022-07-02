import { createAction, props } from '@ngrx/store';
import { CreateProductDto, Product, UpdateProductDto } from '@safari-store/api-interfaces';


// export const addTodo = createAction(
//   '[Todo Page] Add Todo',
//   props<{ content: string }>()
// );
export const addProduct = createAction(
  '[PRODUCTS_TABLE] add product',
  props<{ product: CreateProductDto }>()
);
export const addProductSuccess = createAction(
  '[PRODUCTS_TABLE] add product success',
  props<{ product: Product }>()
);
export const updateProduct = createAction(
  '[PRODUCTS_TABLE] update product',
  props<{ product: UpdateProductDto, _id: string }>()
);
export const updateProductSuccess = createAction(
  '[PRODUCTS_TABLE] update product success',
  props<{ product: Product }>()
);
export const removeProduct = createAction(
  '[PRODUCTS_TABLE] remove product',
  props<{ _id: string }>()
);
export const removeProductSuccess = createAction(
  '[PRODUCTS_TABLE] remove product success',
  props<{ _id: string }>()
);
export const loadProducts = createAction('[PRODUCTS_TABLE] load list of products');
export const loadProductsSuccess = createAction(
  '[PRODUCTS_TABLE] products load success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[PRODUCTS_TABLE] products load failure',
  props<{ error: string }>()
);

import { createReducer, on } from '@ngrx/store';
import { initialState, ProductsTableState } from '../states/products-table.state';
import {
  addProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  removeProductSuccess,
  updateProductSuccess
} from '../actions/products-table.actions';
import { Product } from '@safari-store/api-interfaces';

export const productsTableReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new todo to the todos array
  // on(addTodo, (state, { content }) => ({
  //   ...state,
  //   todos: [...state.todos, { id: Date.now().toString(), content: content }],
  // })),
  on(addProductSuccess, (state: ProductsTableState, action: { product: Product }) => ({
    ...state,
    products: [...state.products, action.product]
  })),
  on(updateProductSuccess, (state: ProductsTableState, action: { product: Product }) => ({
    ...state,
    products: [...state.products.filter((product) => product._id !== action.product._id), action.product]
  })),
  on(removeProductSuccess, (state: ProductsTableState, { _id }: { _id: Product['_id'] } ) => ({
    ...state,
    products: state.products.filter((product) => product._id !== _id),
  })),
  on(loadProducts, (state) => ({...state, status: 'loading'})),
  // Handle successfully loaded todos
  on(loadProductsSuccess, (state, {products}) => ({
    ...state,
    products: products,
    error: '',
    status: 'success',
  })),
  // Handle todos load failure
  on(loadProductsFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);


// export function productsTableReducer(state: any, action: any) {
//   return _productsTableReducer(state, action);
// }

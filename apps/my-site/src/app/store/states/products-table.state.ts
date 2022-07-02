import { Product } from '@safari-store/api-interfaces';

export interface ProductsTableState {
  products: Product[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ProductsTableState = {
  products: [],
  error: '',
  status: 'pending',
};


// export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
//   // selectId: (state) => {
//   //   console.log(state);
//   //   return  state._id
//   // },
//   sortComparer: sortByName,
// });

// export function selectedProductId(product: Product): string {
//   //In this case this would be optional since primary key is id
//   return product._id;
// }
//
// export function sortByName(a: Product, b: Product): number {
//   const compare = a.title.localeCompare(b.title);
//   if (compare > 0) {
//     return -1;
//   }
//
//   if (compare < 0) {
//     return 1;
//   }
//
//   return compare;
// }

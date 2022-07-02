import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { ProductsTableState } from '../states/products-table.state';
import { productsTableReducer } from './products-table.reducer';
import { COLORS_KEY, PRODUCTS_TABLE_KEY, SIZES_KEY } from '../selectors/products-table.selector';
import { ColorsState } from '../states/colors.state';
import { SizesState } from '../states/sizes.state';
import { colorsReducer } from './colors.reducer';
import { sizesReducer } from './sizes.reducer';

export interface State {
  [PRODUCTS_TABLE_KEY]: ProductsTableState;
  [COLORS_KEY]: ColorsState;
  [SIZES_KEY]: SizesState
}

export const reducers: ActionReducerMap<State> = {
  [PRODUCTS_TABLE_KEY]: productsTableReducer,
  [COLORS_KEY]: colorsReducer,
  [SIZES_KEY]: sizesReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

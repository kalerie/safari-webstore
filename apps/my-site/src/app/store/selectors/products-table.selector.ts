import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsTableState } from '../states/products-table.state';
import { ColorsState } from '../states/colors.state';
import { SizesState } from '../states/sizes.state';


export const PRODUCTS_TABLE_KEY = 'products_table';
export const COLORS_KEY = 'colors';
export const SIZES_KEY = 'sizes';
// SELECTOR
// export const featureSelector = createFeatureSelector<ProductsTableState>(PRODUCTS_TABLE_KEY);
// export const productsSelector = (state: StoreState) => state.products;
// export const allProductsSelector = createSelector(
//   productsSelector,
//   (state: ProductsTableState) => state.products
// );


const getProductsState = createFeatureSelector<ProductsTableState>(PRODUCTS_TABLE_KEY);
export const getProducts = createSelector(getProductsState, (state) => state.products);

const getColorsState = createFeatureSelector<ColorsState>(COLORS_KEY);
const getSizesState = createFeatureSelector<SizesState>(SIZES_KEY);
export const getColors = createSelector(getColorsState, (state) => state.colors);
export const getSizes = createSelector(getSizesState, (state) => state.sizes);

// export const colorsSelector = (state: StoreState) => state.colors;
// export const getColors = createSelector(
//   colorsSelector,
//   (state: ColorsState) => state.colors
// )
//
// export const sizesSelector = (state: StoreState) => state.sizes;
// export const getSizes = createSelector(
//   sizesSelector,
//   (state: SizesState) => state.sizes
// )


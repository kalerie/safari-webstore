import { createReducer, on } from '@ngrx/store';
import { Size } from '@safari-store/api-interfaces';
import {
  addSizeSuccess,
  loadSizes,
  loadSizesFailure,
  loadSizesSuccess,
  removeSizeSuccess,
  updateSizeSuccess
} from '../actions/sizes.actions';
import { sizesInitialState, SizesState } from '../states/sizes.state';

export const sizesReducer = createReducer(
  sizesInitialState,
  on(addSizeSuccess, (state: SizesState, action: { size: Size }) => ({
    ...state,
    sizes: [...state.sizes, action.size]
  })),
  on(updateSizeSuccess, (state: SizesState, action: { size: Size }) => ({
    ...state,
    sizes: [...state.sizes.filter((size) => size._id !== action.size._id), action.size]
  })),
  on(removeSizeSuccess, (state: SizesState, { _id }: { _id: Size['_id'] } ) => ({
    ...state,
    sizes: state.sizes.filter((size) => size._id !== _id),
  })),
  on(loadSizes, (state) => ({...state, status: 'loading'})),
  on(loadSizesSuccess, (state, {sizes}) => ({
    ...state,
    sizes: sizes,
    error: '',
    status: 'success',
  })),
  on(loadSizesFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);

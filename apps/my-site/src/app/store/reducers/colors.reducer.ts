import { createReducer, on } from '@ngrx/store';
import { Color } from '@safari-store/api-interfaces';
import {
  addColorSuccess,
  loadColors,
  loadColorsFailure,
  loadColorsSuccess,
  removeColorSuccess,
  updateColorSuccess
} from '../actions/colors.actions';
import { colorsInitialState, ColorsState } from '../states/colors.state';

export const colorsReducer = createReducer(
  colorsInitialState,
  on(addColorSuccess, (state: ColorsState, action: { color: Color }) => ({
    ...state,
    colors: [...state.colors, action.color]
  })),
  on(updateColorSuccess, (state: ColorsState, action: { color: Color }) => ({
    ...state,
    colors: [...state.colors.filter((color) => color._id !== action.color._id), action.color]
  })),
  on(removeColorSuccess, (state: ColorsState, { _id }: { _id: Color['_id'] } ) => ({
    ...state,
    colors: state.colors.filter((color) => color._id !== _id),
  })),
  on(loadColors, (state) => ({...state, status: 'loading'})),
  on(loadColorsSuccess, (state, {colors}) => ({
    ...state,
    colors: colors,
    error: '',
    status: 'success',
  })),
  on(loadColorsFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);

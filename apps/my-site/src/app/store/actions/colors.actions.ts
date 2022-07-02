import { createAction, props } from '@ngrx/store';
import { Color, CreateColorDto, UpdateColorDto } from '@safari-store/api-interfaces';

export const addColor = createAction(
  '[COLORS] add color',
  props<{ color: CreateColorDto }>()
);
export const addColorSuccess = createAction(
  '[COLORS] add color success',
  props<{ color: Color }>()
);
export const updateColor = createAction(
  '[COLORS] update color',
  props<{ color: UpdateColorDto, _id: string }>()
);
export const updateColorSuccess = createAction(
  '[COLORS] update color success',
  props<{ color: Color }>()
);
export const removeColor = createAction(
  '[COLORS] remove color',
  props<{ _id: string }>()
);
export const removeColorSuccess = createAction(
  '[COLORS] remove color success',
  props<{ _id: string }>()
);
export const loadColors = createAction('[COLORS] load list of colors');
export const loadColorsSuccess = createAction(
  '[COLORS] colors load success',
  props<{ colors: Color[] }>()
);
export const loadColorsFailure = createAction(
  '[COLORS] colors load failure',
  props<{ error: string }>()
);

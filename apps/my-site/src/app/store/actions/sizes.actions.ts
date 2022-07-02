import { createAction, props } from '@ngrx/store';
import { CreateSizeDto, Size, UpdateSizeDto } from '@safari-store/api-interfaces';

export const addSize = createAction(
  '[SIZES] add size',
  props<{ size: CreateSizeDto }>()
);
export const addSizeSuccess = createAction(
  '[SIZES] add size success',
  props<{ size: Size }>()
);
export const updateSize = createAction(
  '[SIZES] update size',
  props<{ size: UpdateSizeDto, _id: string }>()
);
export const updateSizeSuccess = createAction(
  '[SIZES] update size success',
  props<{ size: Size }>()
);
export const removeSize = createAction(
  '[SIZES] remove size',
  props<{ _id: string }>()
);
export const removeSizeSuccess = createAction(
  '[SIZES] remove size success',
  props<{ _id: string }>()
);
export const loadSizes = createAction('[SIZES] load list of sizes');
export const loadSizesSuccess = createAction(
  '[SIZES] sizes load success',
  props<{ sizes: Size[] }>()
);
export const loadSizesFailure = createAction(
  '[SIZES] sizes load failure',
  props<{ error: string }>()
);

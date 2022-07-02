import { Color } from '@safari-store/api-interfaces';

export interface ColorsState {
  colors: Color[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const colorsInitialState: ColorsState = {
  colors: [],
  error: '',
  status: 'pending',
};

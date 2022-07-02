import { Size } from '@safari-store/api-interfaces';

export interface SizesState {
  sizes: Size[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const sizesInitialState: SizesState = {
  sizes: [],
  error: '',
  status: 'pending',
};

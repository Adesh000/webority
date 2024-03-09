import {configureStore} from '@reduxjs/toolkit';
import qtyReducer from './quantitySlice';

export const store = configureStore({
  reducer: qtyReducer,
});

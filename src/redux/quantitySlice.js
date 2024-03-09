import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const counterSlice = createSlice({
  name: 'itemQty',
  initialState,
  reducers: {
    increaseQty: (state, action) => {
      state.cart.forEach(element => {
        if (element.id === action.payload) {
          if (element.maximumPerOrderQuantity > element.qty) {
            element.qty += 1;
          }
        }
      });
    },
    decreaseQty: (state, action) => {
      state.cart.forEach(element => {
        if (element.id === action.payload) {
          if (element.qty > 1) {
            element.qty -= 1;
          }
        }
      });
    },
    addItem: (state, action) => {
      state.cart = [...state.cart, {...action.payload, qty: 1}];
    },
    removeItem: (state, action) => {
      const updatedCart = state.cart.filter(item => item.id !== action.payload);
      state.cart = updatedCart;
    },
  },
});
export const {increaseQty, decreaseQty, addItem, removeItem} =
  counterSlice.actions;
export default counterSlice.reducer;

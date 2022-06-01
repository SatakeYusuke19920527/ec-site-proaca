import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ProductType } from '../../types/ProductType';

type InitialStateType = {
  value: ProductType[]
}

const initialState:InitialStateType = {
  value: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    add_product: (state, action) => {
      console.log("🚀 ~ file: productSlice.ts ~ line 20 ~ action.payload", action.payload)
      state.value = action.payload
      
    }
  },
});

export const { add_product } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.value;

export default productSlice.reducer;
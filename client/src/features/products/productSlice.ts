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
      if(state.value.length !== 0) return 
      action.payload.products.data.forEach((product: any) => {
        action.payload.prices.data.forEach((price: any) => {
          if (product.default_price === price.id) {
            let tempProduct: ProductType = {
              default_price: product.default_price,
              description: product.description,
              id: product.id,
              images: product.images,
              name: product.name,
              object: product.object,
            }
            tempProduct.unit_amount = price.unit_amount
            state.value.push(tempProduct)
          }
        });
      });
    }
  },
});

export const { add_product } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.value;

export default productSlice.reducer;
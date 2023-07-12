import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product, CartItem } from "../../models/product.model";

export interface CartState {
  cartItems: CartItem[];
  selectedProduct: Product | null;
}

const initialState: CartState = {
  cartItems: [],
  selectedProduct: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setCartItems, setSelectedProduct } = cartSlice.actions;

export default cartSlice.reducer;

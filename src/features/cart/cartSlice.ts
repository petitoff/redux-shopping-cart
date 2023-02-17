import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ProductsState } from "../products/productsSlice";

export interface CartState {
  items: { [productId: string]: number };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.items[id];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.values(items).reduce((a, b) => a + b, 0)
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) =>
    Object.entries(items)
      .reduce(
        (total, [id, quantity]: [string, number]): number =>
          total + products[id].price * quantity,
        0
      )
      .toFixed(2)
);

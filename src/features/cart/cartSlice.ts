import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.values(items).reduce((a, b) => a + b, 0)
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) =>
    Object.entries(items).reduce(
      (total, [id, quantity]) => total + products[id].price * quantity,
      0
    )
);

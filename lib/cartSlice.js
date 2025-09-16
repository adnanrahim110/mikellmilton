import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };
const clampQty = (n) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 1);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action) => {
      // replace entire cart from storage
      const incoming = Array.isArray(action.payload) ? action.payload : [];
      state.items = incoming.map((it) => ({
        id: it.id,
        title: it.title,
        price: Number(it.price) || 0,
        image: it.image ?? it.img ?? null,
        quantity: clampQty(it.quantity || it.qty || 1),
      }));
    },

    addToCart: (state, action) => {
      const { id, title, price, image, img, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      const imgUrl = image ?? img ?? null;
      if (existing) {
        existing.quantity += clampQty(quantity);
      } else {
        state.items.push({
          id,
          title,
          price: Number(price) || 0,
          image: imgUrl,
          quantity: clampQty(quantity),
        });
      }
    },

    removeFromCart: (state, action) => {
      const id = typeof action.payload === "object" ? action.payload.id : action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },

    increment: (state, action) => {
      const { id } = action.payload;
      const it = state.items.find((i) => i.id === id);
      if (it) it.quantity += 1;
    },

    decrement: (state, action) => {
      const { id } = action.payload;
      const it = state.items.find((i) => i.id === id);
      if (it && it.quantity > 1) it.quantity -= 1;
    },

    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const it = state.items.find((i) => i.id === id);
      if (it) it.quantity = clampQty(quantity);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  increment,
  decrement,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/* selectors */
export const selectCartItems = (state) => state.cart.items;
export const selectItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);
export const selectSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0)
);
export const makeSelectIsInCart =
  (id) =>
    (state) =>
      !!state.cart.items.find((i) => i.id === id);

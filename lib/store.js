import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const PERSIST_KEY = "cart:v1";

const makeStore = (preloadedState) =>
  configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

// create store without preloaded state on the server
export const store = makeStore(
  typeof window === "undefined" ? undefined : (() => {
    try {
      const raw = window.localStorage.getItem(PERSIST_KEY);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw);
      if (!parsed?.cart?.items) return undefined;
      return {
        cart: {
          items: parsed.cart.items.map((it) => ({
            ...it,
            price: Number(it.price) || 0,
            quantity: Number(it.quantity) || 1,
          })),
        },
      };
    } catch {
      return undefined;
    }
  })()
);

// persist to localStorage on the client
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    try {
      window.localStorage.setItem(
        PERSIST_KEY,
        JSON.stringify({ cart: { items: state.cart.items } })
      );
    } catch {
      // ignore quota errors
    }
  });
}

"use client";

import { hydrateCart } from "@/lib/cartSlice";
import { PERSIST_KEY, store } from "@/lib/store";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

function CartHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    // first mount hydration
    try {
      const raw = window.localStorage.getItem(PERSIST_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      const items = parsed?.cart?.items || [];
      dispatch(hydrateCart(items));
    } catch {
      // ignore
    }

    // cross tab sync
    const onStorage = (e) => {
      if (e.key === PERSIST_KEY) {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : null;
          const items = parsed?.cart?.items || [];
          dispatch(hydrateCart(items));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <CartHydrator />
      {children}
    </Provider>
  );
}

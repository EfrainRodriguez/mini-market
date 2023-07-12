import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slices
import cartSlice from "./slices/cart.slice";
// services
import productService from "./services/product.service";

const persistCartConfig = {
  key: "settings",
  storage,
  whitelist: ["cartItems"],
};

const store = configureStore({
  reducer: {
    // slices
    cart: persistReducer<ReturnType<typeof cartSlice>>(
      persistCartConfig,
      cartSlice
    ),
    // services
    [productService.reducerPath]: productService.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }).concat(productService.middleware),
});

// types
export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<unknown>
>;

export const persistor = persistStore(store);

export default store;

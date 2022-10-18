import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/navigation/navigationSlice";
import productsReducer from "./features/products/productsSlice";
import { productApi } from "./services/product";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    products: productsReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

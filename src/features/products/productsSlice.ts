import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Product } from "../../types/product";
import { getFavorites } from "../../utils/storage";

interface ProductsState {
  products: Array<Product>;
  favoriteProductIds: Array<string>;
  categoryFilter?: string;
  shouldReloadProducts: boolean;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  favoriteProductIds: getFavorites(),
  shouldReloadProducts: true,
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Array<Product>>) => {
      state.products = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        ({ _id }) => _id !== action.payload
      );
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const favoriteProductIds = state.favoriteProductIds;
      if (favoriteProductIds.includes(productId)) {
        state.favoriteProductIds = favoriteProductIds.filter(
          (favoriteProductId) => favoriteProductId !== action.payload
        );
      } else {
        state.favoriteProductIds.push(productId);
      }
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setShouldReloadProducts: (state, action: PayloadAction<boolean>) => {
      state.shouldReloadProducts = action.payload;
    },
    setSelectedProductId: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  loadProducts,
  deleteProduct,
  toggleFavorite,
  setCategoryFilter,
  setShouldReloadProducts,
  setSelectedProductId,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;

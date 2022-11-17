import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { getLastPage, saveLastPage } from "../../utils/storage";

export type PageId = "home" | "favorites" | "addProduct" | "productDetail";

interface Page {
  name: string;
  visibleInNavbar: boolean;
}

export const PAGE_IDS: {
  HOME: PageId;
  FAVORITES: PageId;
  ADD_PRODUCT: PageId;
  PRODUCT_DETAIL: PageId;
} = {
  HOME: "home",
  FAVORITES: "favorites",
  ADD_PRODUCT: "addProduct",
  PRODUCT_DETAIL: "productDetail",
};

export const PAGES: {
  [id in PageId]: Page;
} = {
  home: {
    name: "Home Page",
    visibleInNavbar: true,
  },
  favorites: {
    name: "My Favorites",
    visibleInNavbar: true,
  },
  addProduct: {
    name: "Add a New Product",
    visibleInNavbar: false,
  },
  productDetail: {
    name: "Product Details",
    visibleInNavbar: false,
  },
};

interface NavigationState {
  activePageId: string;
}

const initialState: NavigationState = {
  activePageId: getLastPage(),
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    goto: (state, action: PayloadAction<PageId>) => {
      const pageId = action.payload;
      state.activePageId = action.payload || state.activePageId;

      if (PAGES[pageId].visibleInNavbar) {
        saveLastPage(pageId);
      }
    },
  },
});

export const { goto } = navigationSlice.actions;

export const selectNavigation = (state: RootState) =>
  state.navigation.activePageId;

export default navigationSlice.reducer;

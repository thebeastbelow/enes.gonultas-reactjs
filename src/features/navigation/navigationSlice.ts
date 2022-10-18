import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { getLastPage, saveLastPage } from "../../utils/storage";

type PageId = "home" | "favorites";

export const PAGE_IDS: {
  HOME: PageId;
  FAVORITES: PageId;
} = {
  HOME: "home",
  FAVORITES: "favorites",
};

export const PAGE_NAMES = {
  home: "Home Page",
  favorites: "My Favorites",
};

interface NavigationState {
  activePageId: string;
  loadingProgress: number;
}

const initialState: NavigationState = {
  activePageId: getLastPage(),
  loadingProgress: 0,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    goto: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      state.activePageId = action.payload || state.activePageId;

      saveLastPage(pageId);
    },
    increaseLoader: (state) => {
      if (state.loadingProgress < 90) state.loadingProgress += 10;
    },
    setLoadingProgress: (state, action: PayloadAction<number>) => {
      state.loadingProgress = action.payload;
    },
  },
});

export const { goto, increaseLoader, setLoadingProgress } =
  navigationSlice.actions;

export const selectNavigation = (state: RootState) =>
  state.navigation.activePageId;

export default navigationSlice.reducer;

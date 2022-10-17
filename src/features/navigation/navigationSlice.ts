import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface Page {
  id: string;
  name: string;
}

export const PAGES: Array<Page> = [
  { id: "home", name: "Home Page" },
  { id: "add", name: "Add New Product" },
  { id: "favorites", name: "My Favorites" },
];

interface NavigationState {
  activePage: Page;
}

const initialState: NavigationState = {
  activePage: PAGES[0],
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    goto: (state, action: PayloadAction<string>) => {
      state.activePage =
        PAGES.find(({ id }) => id === action.payload) || state.activePage;
    },
  },
});

export const { goto } = navigationSlice.actions;

export const selectNavigation = (state: RootState) =>
  state.navigation.activePage;

export default navigationSlice.reducer;

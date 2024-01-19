import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryMenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenus: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategoryMenu: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceMenuCategoryMenu: (state, action) => {
      // all menuCategories are the same since we're updating one menu's menuCategoryMenus
      // so we just extract menu id from the first guy
      const menuId = action.payload[0].menuId;
      // seperate non-related menuCategoryMenus with a variable
      const otherMenuCategoryMenus = state.items.filter(
        (item) => item.menuId !== menuId
      );
      // combine non-related menuCategoryMenus and updated menuCategoryMenu
      // original menuCategoryMenu in state.items is lost in the memory now
      state.items = [...otherMenuCategoryMenus, ...action.payload];
    },
  },
});

export const {
  setMenuCategoryMenus,
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;

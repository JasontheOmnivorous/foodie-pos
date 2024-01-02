import { MenuCategorySlice } from "@/types/menuCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenuCategories } = menuCategorySlice.actions;
export default menuCategorySlice.reducer;

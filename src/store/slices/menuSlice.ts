import { CreateMenuOptions, GetMenusOptions, MenuSlice } from "@/types/menu";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (options: CreateMenuOptions, thunkApi) => {
    const { onSuccess, onError, name, price, menuCategoryIds } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/menu`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, price, menuCategoryIds }),
      });
      const data = await response.json();
      thunkApi.dispatch(addMenus(data));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const getMenus = createAsyncThunk(
  "menu/getMenus",
  async (options: GetMenusOptions, thunkApi) => {
    const { onSuccess, onError, locationId } = options;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/menu?locationId=${locationId}`
      );
      const responseData = await response.json();
      thunkApi.dispatch(setMenus(responseData));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },
    addMenus: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setMenus, addMenus } = menuSlice.actions;
export default menuSlice.reducer;

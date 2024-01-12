import { configureStore } from "@reduxjs/toolkit";
import addonCategoryReducer from "./slices/addonCategorySlice";
import addonReducer from "./slices/addonSlice";
import appReducer from "./slices/appSlice";
import locationReducer from "./slices/locationSlice";
import menuCategoryMenuReducer from "./slices/menuCategoryMenuSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
import menuReducer from "./slices/menuSlice";
import tableReducer from "./slices/tableSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
    menuCategory: menuCategoryReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    addonCategory: addonCategoryReducer,
    addon: addonReducer,
    location: locationReducer,
    table: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

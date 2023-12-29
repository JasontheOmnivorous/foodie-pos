import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import menuReducer from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

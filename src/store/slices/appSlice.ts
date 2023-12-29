import { AppSlice, GetAppDataOptions } from "@/types/app";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AppSlice = {
  init: false, // boolean value to control data fetching in the layout
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/getAppData",
  async (options: GetAppDataOptions, thunkApi) => {
    const { onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/app`);
      const appData = await response.json();
      thunkApi.dispatch(setInit(true)); // set init to true after fetching data once to prevent frequent fetching
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = appSlice.actions;
export default appSlice.reducer;

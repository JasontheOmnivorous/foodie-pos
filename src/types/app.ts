import { BaseOptions } from "./menu";

export interface AppSlice {
  init: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface GetAppDataOptions extends BaseOptions {}

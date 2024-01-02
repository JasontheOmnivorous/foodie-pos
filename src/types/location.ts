import { Location } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface LocationSlice {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface GetLocationOptions extends BaseOptions {}

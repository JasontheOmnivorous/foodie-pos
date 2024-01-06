import { Location } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface LocationSlice {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateLocationOptions extends BaseOptions {
  name: string;
  address: string;
}

export interface LocationPayload {
  name: string;
  address: string;
}

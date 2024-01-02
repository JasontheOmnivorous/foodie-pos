import { Addon } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface AddonSlice {
  items: Addon[];
  isLoading: boolean;
  error: Error | null;
}

export interface GetAddonOptions extends BaseOptions {}

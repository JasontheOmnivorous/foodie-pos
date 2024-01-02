import { AddonCategory } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface AddonCategorySlice {
  items: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface GetAddonCategoryOptions extends BaseOptions {}

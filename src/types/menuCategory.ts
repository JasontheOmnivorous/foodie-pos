import { MenuCategory } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface MenuCategorySlice {
  items: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface GetMenuCategoryOptions extends BaseOptions {}

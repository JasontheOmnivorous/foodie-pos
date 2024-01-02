import { Menu } from "@prisma/client";

export interface MenuSlice {
  items: Menu[];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (err?: any) => void;
}

export interface GetMenusOptions extends BaseOptions {
  locationId: string;
}

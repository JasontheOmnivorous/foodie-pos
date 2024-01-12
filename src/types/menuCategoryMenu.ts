export interface CreateMenuCategoryMenuPayload {
  menuId: number;
  menuCategoryId: number;
}

export interface MenuCategoryMenuSlice {
  items: CreateMenuCategoryMenuPayload[];
  isLoading: boolean;
  error: Error | null;
}

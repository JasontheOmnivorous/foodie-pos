import { Table } from "@prisma/client";
import { BaseOptions } from "./menu";

export interface TableSlice {
  items: Table[];
  isLoading: boolean;
  error: Error | null;
}

export interface GetTableOptions extends BaseOptions {}

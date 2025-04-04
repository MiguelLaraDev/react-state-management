export type Filter = "category" | "price" | "score" | "availability";

export interface FilterOption {
  id: Filter;
  items: {
    id: string;
    count: number;
  }[];
}

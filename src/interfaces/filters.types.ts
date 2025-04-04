export type Filter = "categories" | "price" | "score" | "availability";

export interface FilterOption {
  id: Filter;
  title: string;
  items: {
    label: string;
    count: number;
  }[];
}

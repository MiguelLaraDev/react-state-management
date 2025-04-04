export type Category = "guitars" | "drums" | "synths" | "microphones";

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
}

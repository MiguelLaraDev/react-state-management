import type { Category } from "./categories.types";
import type { Filter } from "./filters.types";
import type { Availability, SortDirection } from "./shared.types";

export interface InstrumentFilterOptions {
  availability?: Instrument["availability"][];
  categories?: Instrument["category"][];
  priceRanges?: {
    min: number;
    max: number;
  }[];
  scoreRange?: {
    min: number;
    max: number;
  };
  sortBy?: {
    field: Filter;
    direction: SortDirection;
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface Instrument {
  availability: Availability;
  category: Category;
  description: string;
  long_description?: string;
  id: number;
  image: string;
  name: string;
  price: number;
  score: number;
  slug: string;
  thumb_medium: string;
  thumb_small: string;
}

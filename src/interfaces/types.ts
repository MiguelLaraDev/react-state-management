// types.ts
export type SortDirection = "asc" | "desc";
export type SortableField = "name" | "price"; // Add more fields as needed

export interface InstrumentFilterOptions {
  categories?: Instrument["category"][];
  priceRanges?: { min: number; max: number }[];
  scoreRange?: { min: number; max: number };
  availability?: Instrument["availability"][];
  sortBy?: {
    field: SortableField;
    direction: SortDirection;
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export interface Instrument {
  availability: "available" | "few left" | "sold-out";
  category: "guitars" | "drums" | "synths" | "microphones";
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  score: number;
  slug: string;
  thumb_medium: string;
  thumb_small: string;
}

export interface InstrumentsApiResponse {
  instruments: Instrument[];
  nextPage: number | null; // null when no more pages
  currentPage: number;
  totalPages: number;
}

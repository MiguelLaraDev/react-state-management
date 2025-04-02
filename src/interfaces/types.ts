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

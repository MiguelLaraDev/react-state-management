export interface Instrument {
  id: number;
  slug: string;
  name: string;
  price: number;
  description: string;
  availability: 'available' | 'few left' | 'sold-out';
  score: number;
  thumb_small: string;
  thumb_medium: string;
  image: string;
}

export interface InstrumentData {
  guitars: Instrument[];
  drums: Instrument[];
  keyboards: Instrument[];
  microphones: Instrument[];
}

export interface InstrumentsPage {
  instruments: Instrument[];
  nextPage: number | null; // null when no more pages
  currentPage: number;
  totalPages: number;
}

export interface InstrumentsApiResponse {
  guitars: InstrumentsPage;
  drums: InstrumentsPage;
  keyboards: InstrumentsPage;
  microphones: InstrumentsPage;
}
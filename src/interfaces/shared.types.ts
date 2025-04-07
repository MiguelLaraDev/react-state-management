import type { Instrument } from "./instruments.types";

export type SortDirection = "asc" | "desc";

export type Availability = "available" | "few-left" | "sold-out";

export interface ApiResponseBase<T> {
  currentPage: number;
  data: T;
  nextPage: number | null;
  totalItems: number;
  totalPages: number;
}

export type ApiResponse = ApiResponseBase<[]>;

export type InstrumentApiResponse = ApiResponseBase<Instrument[]>;

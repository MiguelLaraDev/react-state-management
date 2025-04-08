import type { DefaultBodyType, StrictRequest } from "msw";
import type { Filter } from "../../interfaces/filters.types";
import type { Instrument, InstrumentFilterOptions } from "../../interfaces/instruments.types";
import type { InstrumentApiResponse, SortDirection } from "../../interfaces/shared.types";
import type { SortBy } from "../../stores/filters.store";

export const selectByField = <FieldName extends keyof Instrument>(
  instruments: Instrument[],
  field: FieldName,
  value: Instrument[FieldName]
) => {
  return instruments.filter((instrument) => instrument[field] === value);
};

const priceChecker = (instrumentPrice: number, priceRanges: string[]) => {
  if (priceRanges.length === 0) {
    return true;
  }

  return priceRanges.some((range) => {
    const [min, max] = range.replace("+", "-500").split("-").map(Number);
    return instrumentPrice >= min && instrumentPrice <= max;
  });
};

export const processFilters = (request: StrictRequest<DefaultBodyType>) => {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const paginationAndSortingKeys = new Set(["page", "sort_by", "sort_direction"]);

  const filters: Record<string, string | string[] | SortBy> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === "" || paginationAndSortingKeys.has(key)) continue;

    filters[key] = value.split("|");
  }

  filters.sortBy = {
    field: (params?.sort_by ?? "name") as Filter,
    direction: (params?.sort_direction ?? "asc") as SortDirection,
  };

  return filters;
};

export const getFilteredInstruments = (
  instruments: Instrument[],
  options: InstrumentFilterOptions = {}
): InstrumentApiResponse => {
  const {
    category = [],
    price = [],
    scoreRange = { min: 0, max: 5 },
    availability = [],
    sortBy = { field: "name", direction: "asc" },
    pagination = { page: 1, pageSize: 10 },
  } = options;

  // 1. Apply filters
  const results = instruments.filter((instrument) => {
    const categoryMatch = category.length === 0 || category.includes(instrument.category);

    priceChecker(instrument.price, price);

    const priceMatch = priceChecker(instrument.price, price);

    const scoreMatch = scoreRange
      ? instrument.score >= scoreRange.min && instrument.score <= scoreRange.max
      : true;

    const availabilityMatch =
      availability.length === 0 || availability.includes(instrument.availability);

    return categoryMatch && priceMatch && scoreMatch && availabilityMatch;
  });

  // 2. Apply sorting
  if (sortBy) {
    results.sort((a, b) => {
      const { field, direction } = sortBy!;
      const modifier = direction === "asc" ? 1 : -1;

      if (field === "name") {
        return a.name.localeCompare(b.name) * modifier;
      } else if (field === "price") {
        return (a.price - b.price) * modifier;
      }
      return 0;
    });
  }

  // 3. Apply pagination
  let paginatedResults = results;
  let totalPages = 1;

  if (pagination) {
    const { page, pageSize } = pagination;
    const startIndex = (page - 1) * pageSize;
    totalPages = Math.ceil(results.length / pageSize);
    paginatedResults = results.slice(startIndex, startIndex + pageSize);
  }

  return {
    currentPage: pagination ? pagination.page : 1,
    data: paginatedResults,
    nextPage: pagination.page < totalPages ? pagination.page + 1 : null,
    totalItems: results.length,
    totalPages,
  };
};

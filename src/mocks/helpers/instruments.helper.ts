import type { Instrument, InstrumentFilterOptions } from "../../interfaces/instruments.types";
import type { InstrumentApiResponse } from "../../interfaces/shared.types";

export const selectByField = <FieldName extends keyof Instrument>(
  instruments: Instrument[],
  field: FieldName,
  value: Instrument[FieldName]
) => {
  return instruments.filter((instrument) => instrument[field] === value);
};

export const getFilteredInstruments = (
  instruments: Instrument[],
  options: InstrumentFilterOptions = {}
): InstrumentApiResponse => {
  const {
    categories = [],
    priceRanges = [],
    scoreRange = { min: 0, max: 5 },
    availability = [],
    sortBy = { field: "name", direction: "asc" },
    pagination = { page: 1, pageSize: 10 },
  } = options;

  // 1. Apply filters
  const results = instruments.filter((instrument) => {
    const categoryMatch = categories.length === 0 || categories.includes(instrument.category);

    const priceMatch =
      priceRanges?.length > 0
        ? priceRanges.some(
            (range) => instrument.price >= range.min && instrument.price <= range.max
          )
        : true;

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

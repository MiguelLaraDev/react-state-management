import type { FilterOption } from "../../interfaces/filters.types";
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

export const getFiltersOptions = (instruments: Instrument[]): FilterOption[] => {
  const categories = Array.from(new Set(instruments.map((instrument) => instrument.category)));

  console.log("categories", categories);

  // const priceRanges = [
  //   { min: 0, max: 50 },
  //   { min: 51, max: 100 },
  //   { min: 101, max: 200 },
  //   { min: 201, max: 500 },
  //   { min: 501, max: Infinity },
  // ];
  // const scoreRange = {
  //   min: Math.min(...instruments.map((i) => i.score)),
  //   max: Math.max(...instruments.map((i) => i.score)),
  // };
  // const availability = Array.from(
  //   new Set(instruments.map((instrument) => instrument.availability))
  // );

  return [];
};

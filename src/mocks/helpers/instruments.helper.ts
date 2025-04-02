import type { Instrument, InstrumentFilterOptions } from "../../interfaces/types";

export const selectByField = <FieldName extends keyof Instrument>(
  instruments: Instrument[],
  field: FieldName,
  value: Instrument[FieldName]
) => {
  return instruments.filter((instrument) => instrument[field] === value);
};

export const getFilteredInstruments = (
  instruments: Instrument[],
  options: InstrumentFilterOptions
) => {
  // 1. Apply filters
  const results = instruments.filter((instrument) => {
    const categoryMatch = options.categories
      ? options.categories.includes(instrument.category)
      : true;

    const priceMatch = options.priceRanges
      ? options.priceRanges.some(
          (range) => instrument.price >= range.min && instrument.price <= range.max
        )
      : true;

    const scoreMatch = options.scoreRange
      ? instrument.score >= options.scoreRange.min && instrument.score <= options.scoreRange.max
      : true;

    const availabilityMatch = options.availability
      ? options.availability.includes(instrument.availability)
      : true;

    return categoryMatch && priceMatch && scoreMatch && availabilityMatch;
  });

  // 2. Apply sorting
  if (options.sortBy) {
    results.sort((a, b) => {
      const { field, direction } = options.sortBy!;
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

  if (options.pagination) {
    const { page, pageSize } = options.pagination;
    const startIndex = (page - 1) * pageSize;
    totalPages = Math.ceil(results.length / pageSize);
    paginatedResults = results.slice(startIndex, startIndex + pageSize);
  }

  return {
    data: paginatedResults,
    total: results.length,
    totalPages,
    hasNextPage: options.pagination ? options.pagination.page < totalPages : false,
  };
};

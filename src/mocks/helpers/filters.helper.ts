import type { Filter, FilterOption } from "../../interfaces/filters.types";
import type { Instrument } from "../../interfaces/instruments.types";

const filters: FilterOption[] = [
  {
    id: "category",
    title: "Categories",
    items: [],
  },
  {
    id: "price",
    title: "Price range",
    items: [],
  },
  {
    id: "score",
    title: "Score",
    items: [],
  },
  {
    id: "availability",
    title: "Availability",
    items: [],
  },
];

const getPriceRange = (price: number): string => {
  switch (true) {
    case price <= 50:
      return "$0-$50";
    case price <= 100:
      return "$50-$100";
    case price <= 200:
      return "$100-$200";
    case price <= 500:
      return "$200-$500";
    default:
      return "$500+";
  }
};

const getStarRating = (score: number): number => {
  const clampedScore = Math.min(Math.max(score, 0), 5);
  return Math.ceil(clampedScore);
};

export const getFilters = (instruments: Instrument[]) => {
  const counts: Record<Filter, Record<string, number>> = {
    category: {},
    price: { "$0-$50": 0, "$50-$100": 0, "$100-$200": 0, "$200-$500": 0, "$500+": 0 },
    score: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    availability: {},
  };

  instruments.forEach((instrument) => {
    filters.forEach(({ id }) => {
      if (id === "price") {
        const range = getPriceRange(instrument.price);
        counts.price[range]++;
      } else if (id === "score") {
        const stars = getStarRating(instrument.score);
        counts.score[stars]++;
      } else {
        const value = String(instrument[id as keyof Instrument]);
        counts[id][value] = (counts[id][value] || 0) + 1;
      }
    });
  });

  return filters.map((filter) => {
    return {
      ...filter,
      items: Object.entries(counts[filter.id]).map(([label, count]) => ({
        label,
        count,
      })),
    };
  });
};

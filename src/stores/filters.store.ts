import { create } from "zustand";
import type { Filter } from "../interfaces/filters.types";
import type { SortDirection } from "../interfaces/shared.types";

export type SortBy = {
  field: Filter | "name";
  direction: SortDirection;
};

type UserSelectionStore = {
  options: Record<Filter, string[]>;
  sortBy: SortBy;
  toggleOption: (type: Filter, option: string) => void;
  updateSortBy: (newSortBy: SortBy) => void;
  getParsedFilters: () => string;
};

const defaultOptions = {
  category: [],
  price: [],
  score: [],
  availability: [],
};

const defaultSort: SortBy = {
  field: "price",
  direction: "asc",
};

export const useUserSelectionStore = create<UserSelectionStore>((set, get) => ({
  options: defaultOptions,
  sortBy: defaultSort,
  toggleOption: (type, option) => {
    set((state) => {
      const currentOptions = state.options[type];
      const optionExists = currentOptions.includes(option);

      const newOptions = optionExists
        ? currentOptions.filter((item) => item !== option)
        : [...currentOptions, option];

      return {
        options: {
          ...state.options,
          [type]: newOptions,
        },
      };
    });
  },
  updateSortBy: (newSortBy) => {
    set(() => {
      return { sortBy: newSortBy };
    });
  },
  getParsedFilters: () => {
    const optionsStr = Object.entries(get().options).reduce(
      (acc, [key, value]) => `${acc}&${key}=${value.join("|")}`,
      "",
    );

    const sortBy = get().sortBy;
    const sortByStr = `sort_by=${sortBy.field}&sort_direction=${sortBy.direction}`;

    return `${optionsStr}&${sortByStr}`;
  },
}));

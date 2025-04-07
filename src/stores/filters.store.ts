import { create } from "zustand";
import type { Filter } from "../interfaces/filters.types";
import type { SortDirection } from "../interfaces/shared.types";

type SortBy = {
  field: Filter;
  direction: SortDirection;
};

type UserSelectionStore = {
  options: Record<Filter, string[]>;
  sortBy: SortBy;
  toggleOption: (type: Filter, option: string) => void;
  updateSortBy: (sortBy: SortBy) => void;
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

export const useUserSelectionStore = create<UserSelectionStore>((set) => ({
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
  updateSortBy: (sortBy) => {
    set(() => {
      return { sortBy };
    });
  },
}));

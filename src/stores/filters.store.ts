import { create } from "zustand";
import type { Filter } from "../interfaces/filters.types";

type FiltersStore = {
  options: Record<Filter, string[]>;
  toggleOption: (type: Filter, option: string) => void;
};

const defaultStore = {
  category: [],
  price: [],
  score: [],
  availability: [],
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  options: defaultStore,
  toggleOption: (type, option) => {
    set((state) => {
      const currentOptions = state.options[type];
      const optionExists = currentOptions.includes(option);

      const newOptions = optionExists
        ? currentOptions.filter((item) => item !== option) // remove if exists
        : [...currentOptions, option]; // add if doesn't exist

      return {
        options: {
          ...state.options,
          [type]: newOptions,
        },
      };
    });
  },
}));

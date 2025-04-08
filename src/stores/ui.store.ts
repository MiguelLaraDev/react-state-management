import { create } from "zustand";

type UiStore = {
  filterIsOpen: boolean;
  toggleFilter: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  filterIsOpen: false,
  toggleFilter: () =>
    set((state) => {
      return { filterIsOpen: !state.filterIsOpen };
    }),
}));

import { create } from "zustand";

type LocalizationStore = {
  locale: Record<string, string>;
  setStrings: (newString: Record<string, string>) => void;
};

export const useLocalizationStore = create<LocalizationStore>((set) => ({
  locale: {},
  setStrings: (newStrings) => set({ locale: newStrings }),
}));

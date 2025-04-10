import { create } from "zustand";

type LocalizationStore = {
  locale: Record<string, string | Record<string, string>>;
  setValues: (newStrings: Record<string, string | Record<string, string>>) => void;
};

export const useLocalizationStore = create<LocalizationStore>((set) => ({
  locale: {},
  setValues: (newStrings) => set({ locale: newStrings }),
}));

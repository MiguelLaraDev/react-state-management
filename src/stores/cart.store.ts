import { create } from "zustand";

type CartStore = {
  cart: string[];
  add: () => void;
  remove: () => void;
  reset: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: ["one", "two", "three"],
  add: () => {
    const newItem = "new item";

    set((state) => ({ cart: [...state.cart, newItem] }));
  },
  remove: () => {
    set((state) => ({ cart: [...state.cart] }));
  },
  reset: () => {
    set(() => ({ cart: [] }));
  },
}));

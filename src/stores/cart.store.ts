import { create } from "zustand";
import type { Instrument } from "../interfaces/instruments.types";

export type CartStoreItem = Pick<Instrument, "id" | "image" | "name" | "price" | "slug"> & {
  quantity: number;
};

type CartStore = {
  cart: CartStoreItem[];
  add: (item: CartStoreItem) => void;
  remove: (id: number) => void;
  reset: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  add: (item) => {
    set((state) => ({ cart: [...state.cart, item] }));
  },
  remove: (id) => {
    console.log(id);
    set((state) => ({ cart: [...state.cart] }));
  },
  reset: () => {
    set(() => ({ cart: [] }));
  },
}));

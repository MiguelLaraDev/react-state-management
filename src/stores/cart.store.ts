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
    set((state) => {
      const existingIndex = state.cart.findIndex((v) => v.id === item.id);

      if (existingIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
        };
        return { cart: updatedCart };
      }

      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    });
  },
  remove: (id) => {
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
  },
  reset: () => {
    set(() => ({ cart: [] }));
  },
}));

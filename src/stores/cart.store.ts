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
  getCount: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
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
  getCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + item.quantity * item.price, 0);
  },
}));

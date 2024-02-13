import { create } from "zustand";
import { ProductProps } from "../../utils/data/products";
import * as cartInMemory from "./helpers/cart-in-memory";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type ProductCartProps = ProductProps & {
  quantity: number;
};
type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (product: string) => void;
  clear: () => void;
};

export const useCardStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      add: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),
      remove: (productId: string) =>
        set((state) => ({
          products: cartInMemory.remove(state.products, productId),
        })),
      clear: () => set((state) => ({ products: [] })),
    }),
    {
      name: "nlw-expert: cart",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

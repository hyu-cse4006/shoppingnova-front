import { create } from "zustand";

interface ProductState {
  hoveringProductId: number;
  setHoveringProductId: (hoveringProductId: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  hoveringProductId: -1,
  setHoveringProductId: (hoveringProductId: number) =>
    set({
      hoveringProductId,
    }),
}));

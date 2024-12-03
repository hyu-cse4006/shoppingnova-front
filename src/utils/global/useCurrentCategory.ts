import { create } from "zustand";

type CategoryState = {
  category: string;
  setCategory: (value: string) => void;
};

export const useCurrentCategory = create<CategoryState>((set) => ({
  category: "",
  setCategory: (newVal) => set(() => ({ category: newVal })),
}));

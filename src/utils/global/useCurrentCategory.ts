import { create } from "zustand";

type CategoryState = {
  currentCategory: string;
  setCurrentCategory: (value: string) => void;
};

export const useCurrentCategory = create<CategoryState>((set) => ({
  currentCategory: "",
  setCurrentCategory: (newVal) => set(() => ({ currentCategory: newVal })),
}));

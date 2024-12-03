import { create } from "zustand";

interface ViewState {
  view: string;
  setView: (view: string) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  view: "MAIN",
  setView: (view: string) => set({ view }),
}));

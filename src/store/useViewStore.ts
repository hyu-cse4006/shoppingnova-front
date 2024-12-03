import { create } from "zustand";

interface ViewState {
  view: string;
  displayItem: boolean;
  setView: (view: string) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  view: "HOME",
  displayItem: false,
  setView: (view: string) => {
    set({ view, displayItem: view !== "Cleaner" });
  },
}));

import { create } from "zustand";

interface ViewState {
  view: string;
  displayItem: boolean;
  setDisplayItem: (displayItem: boolean) => void;
  setView: (view: string) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  view: null,
  displayItem: false,
  setDisplayItem: (displayItem: boolean) => set({ displayItem }),
  setView: (view: string) => {
    set({ view });
  },
}));

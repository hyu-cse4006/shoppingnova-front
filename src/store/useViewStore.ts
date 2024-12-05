import { create } from "zustand";

type ViewType = "Category" | "Products" | "Detail" | "Cart";
interface ViewState {
  view: string | null;
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  setView: (view: string) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  view: null,
  viewType: "Category",
  displayItem: false,
  setViewType: (viewType: ViewType) => set({ viewType }),
  setView: (view: string) => {
    if (view == "HOME") set({ view, viewType: "Category" });
    else set({ view });
  },
}));

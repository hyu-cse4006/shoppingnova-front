import { create } from "zustand";

type Info = {
  id: number;
  setId: (value: number) => void;
};

export const useUserInfo = create<Info>((set) => ({
  id: 0,
  setId: (newVal) => set(() => ({ id: newVal })),
}));

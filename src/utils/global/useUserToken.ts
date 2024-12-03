import { create } from "zustand";

type Token = {
  token: string;
  setToken: (value: string) => void;
};

export const useUserToken = create<Token>((set) => ({
  token: "",
  setToken: (newVal) => set(() => ({ token: newVal })),
}));

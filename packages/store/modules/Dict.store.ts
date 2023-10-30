import { create } from "zustand";

type DictStoreState = {
  dicts: Record<string, any>;
  setDicts: (dicts: Record<string, any>) => void;
};

export const useDictStore = create<DictStoreState>((set) => ({
  dicts: {},
  setDicts: (dicts) => set(() => ({ dicts })),
}));

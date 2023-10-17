import { create } from 'zustand'

type GlobalStoreState = {
  GlobalLoading: boolean
  Backdrop: boolean
  KeyValueMap: Record<string, string>
  setGlobalLoading: (loading: boolean) => void
  setKeyValueMap: (keyValueMap: Record<string, string>) => void
}

export const useGlobalStore = create<GlobalStoreState>((set) => ({
  GlobalLoading: false,
  Backdrop: false,
  KeyValueMap: {},
  setGlobalLoading: (loading: boolean) => set(() => ({ GlobalLoading: loading })),
  setKeyValueMap: (KeyValueMap: Record<string, string>) => set(() => ({ KeyValueMap }))
}))

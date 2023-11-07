import { create } from 'zustand'

type GlobalStoreState = {
  GlobalLoading: boolean
  Backdrop: boolean
  KeyValueMap: Record<string, string>
  userInfo: Record<string, string>
  globalState: Record<string, any>
  setGlobalLoading: (loading: boolean) => void
  setKeyValueMap: (keyValueMap: Record<string, string>) => void
  setUserInfo: (userInfo: Record<string, any>) => void
  setGlobalState: (globalState: Record<string, any>) => void
}

export const useGlobalStore = create<GlobalStoreState>((set) => ({
  GlobalLoading: false,
  Backdrop: false,
  userInfo: {},
  KeyValueMap: {},
  globalState: {},
  setGlobalLoading: (loading: boolean) => set(() => ({ GlobalLoading: loading })),
  setKeyValueMap: (KeyValueMap: Record<string, string>) => set(() => ({ KeyValueMap })),
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  setGlobalState: (globalState) => set(() => ({ globalState }))
}))

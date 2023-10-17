import { create } from 'zustand'

import { useGlobalStore } from './Global.store'

type GlobalThreeState = {
  show: boolean
  setShow: (loading: boolean) => void
  showGlobal: () => void
}

export const useThreeStore = create<GlobalThreeState>((set) => ({
  show: false,
  setShow: (loading: boolean) => set(() => ({ show: loading })),
  showGlobal: () =>
    set(() => {
      console.log('GlobalStore', useGlobalStore.getState().GlobalLoading)
      console.log(
        'GlobalStore',
        useGlobalStore.setState((state) => ({ ...state, GlobalLoading: true }))
      )
      return {}
    })
}))

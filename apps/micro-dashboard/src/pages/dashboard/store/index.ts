import { createWithEqualityFn } from 'zustand/traditional'

type TDashboardState = {
  asideOpen: boolean
}

type TDashboardActions = {
  setAsideOpen: (open: boolean) => void
}

export const useDashboardStore = createWithEqualityFn<TDashboardState & TDashboardActions>((set) => ({
  asideOpen: true,
  setAsideOpen: (open: boolean) => set({ asideOpen: open })
}))

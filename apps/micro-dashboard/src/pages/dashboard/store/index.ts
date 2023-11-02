import { create } from 'zustand'

type TDashboardState = {
  asideOpen: boolean
}

type TDashboardActions = {
  setAsideOpen: (open: boolean) => void
}

export const useDashboardStore = create<TDashboardState & TDashboardActions>((set) => ({
  asideOpen: true,
  setAsideOpen: (open: boolean) => set({ asideOpen: open })
}))

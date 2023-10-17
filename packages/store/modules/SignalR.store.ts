import { create } from 'zustand'

type TSignalLocation = {
  locationId: number
  isFull: boolean
  isAlarm: boolean
  locationStats: number
  timestamp: string
}

type TSignalDevice = {
  no: string
  state: string
  x: number
  y: number
  z: number
  health: string
  properties: Record<string, any>
}

type TSignalRState = {
  location?: TSignalLocation
  device?: TSignalDevice
}

type TSignalRAction = {
  updateLocation: (location: TSignalLocation) => void
  updateDevice: (device: TSignalDevice) => void
}

export const useSignalRStore = create<TSignalRState & TSignalRAction>((set) => ({
  location: undefined,
  device: undefined,
  updateLocation: (location: TSignalRState['location']) =>
    set(() => ({
      location
    })),
  updateDevice: (device: TSignalRState['device']) =>
    set(() => ({
      device
    }))
}))

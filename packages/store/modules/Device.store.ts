import { IDeviceTypeResponse } from 'apis'
import { create } from 'zustand'

type TDeviceState = {
  deviceTypeList: IDeviceTypeResponse['Items']
}

type TDeviceAction = {
  updateDeviceTypeList: (deviceTypeList: IDeviceTypeResponse['Items']) => void
}

export const useDeviceStore = create<TDeviceState & TDeviceAction>((set) => ({
  deviceTypeList: [],
  updateDeviceTypeList: (deviceTypeList: IDeviceTypeResponse['Items']) =>
    set(() => ({
      deviceTypeList
    }))
}))

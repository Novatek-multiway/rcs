import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

export enum EWebsocketMessagePath {
  ReportGetHomeChargeGoodsStations = 'Report/GetHomeChargeGoodsStations', // 获取待命点，充点电，有货库位
  ReportGetOnLineCarriers = 'Report/GetOnLineCarriers' // 获取在线车辆
}

type TWebsocketState = {
  [EWebsocketMessagePath.ReportGetOnLineCarriers]: ReportAPI.OnlineCarrier[]
  [EWebsocketMessagePath.ReportGetHomeChargeGoodsStations]: ReportAPI.ChargeGoodsStations[]
}

type TWebsocketActions = {
  setReportGetOnLineCarriers: (onlineCarriers: TWebsocketState['Report/GetOnLineCarriers']) => void
  setReportGetHomeChargeGoodsStations: (
    chargeGoodsStations: TWebsocketState['Report/GetHomeChargeGoodsStations']
  ) => void
}

export const useWebsocketStore = createWithEqualityFn<TWebsocketState & TWebsocketActions>(
  (set) => ({
    'Report/GetOnLineCarriers': [],
    'Report/GetHomeChargeGoodsStations': [],
    setReportGetOnLineCarriers: (onlineCarriers: TWebsocketState['Report/GetOnLineCarriers']) =>
      set({ 'Report/GetOnLineCarriers': onlineCarriers }),
    setReportGetHomeChargeGoodsStations: (chargeGoodsStations: TWebsocketState['Report/GetHomeChargeGoodsStations']) =>
      set({ 'Report/GetHomeChargeGoodsStations': chargeGoodsStations })
  }),
  shallow
)

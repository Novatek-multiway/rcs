import { create } from 'zustand'

import { ILineProps } from '../components/lines'
import { EMapSettingsKeys } from '../constants'

export type TTwoDMapState = {
  stageSize: { width: number; height: number } // 当前画布宽高
  mapSize: { width: number; height: number } // 当前地图宽高
  stageMapRatio: number // 画布地图比
  currentScale: number // 当前地图缩放
  cursorPosition: { x: number; y: number } // 当前光标在画布中的坐标
  idPointMap: Map<number, { x: number; y: number }> // 点位id坐标map
  idLineMap: Map<number, ILineProps> // 边id map
  stageLeftTopPosition: { x: number; y: number } // 画布左上角
  mapCenterPosition: { x: number; y: number } // 地图中间坐标
  settings: {
    [EMapSettingsKeys.IS_LOCATION_VISIBLE]: boolean // 显示库位
    [EMapSettingsKeys.IS_POINT_VISIBLE]: boolean // 显示点位
    [EMapSettingsKeys.IS_DIRECTION_VISIBLE]: boolean // 显示方向
    [EMapSettingsKeys.IS_VEHICLE_OUTLINE_VISIBLE]: boolean // 显示车辆轮廓
    [EMapSettingsKeys.IS_VEHICLE_IMAGE_VISIBLE]: boolean // 显示车辆图片
    [EMapSettingsKeys.IS_VEHICLE_BENCHMARK_VISIBLE]: boolean // 显示车辆基准点
    [EMapSettingsKeys.IS_VEHICLE_ON_WORK_VISIBLE]: boolean // 显示工作车辆
    [EMapSettingsKeys.IS_VEHICLE_PLANNING_VISIBLE]: boolean // 显示规划路线
    [EMapSettingsKeys.IS_FAULTY_VEHICLE_VISIBLE]: boolean // 显示故障车辆
    [EMapSettingsKeys.IS_VEHICLE_DETAIL_VISIBLE]: boolean // 显示车辆详情
    [EMapSettingsKeys.IS_VEHICLE_PLANNING_SINGLE_COLOR]: boolean // 规划路线显示单一颜色
    [EMapSettingsKeys.IS_DEV_MODE]: boolean // 开发模式
    [EMapSettingsKeys.IS_STATION_VISIBLE]: boolean // 显示站点
    [EMapSettingsKeys.LINE_COLOR]: string // 地图路线颜色
    [EMapSettingsKeys.PLANNING_LINE_COLOR]: string // 规划路线颜色
  }
}

type TTwoDMaoActions = {
  setStageSize: (stageSize: TTwoDMapState['stageSize']) => void
  setMapSize: (mapSize: TTwoDMapState['mapSize']) => void
  setCurrentScale: (currentScale: number) => void
  setCursorPosition: (cursorPosition: TTwoDMapState['cursorPosition']) => void
  setPoint: (id: number, point: { x: number; y: number }) => void
  setLine: (id: number, line: ILineProps) => void
  setStageLeftTopPosition: (stageLeftTopPosition: { x: number; y: number }) => void
  setMapCenterPosition: (mapCenterPosition: { x: number; y: number }) => void
  setSettings: (settings: Partial<TTwoDMapState['settings']>) => void
}

const getStageMapRatio = (stageSize: TTwoDMapState['stageSize'], mapSize: TTwoDMapState['mapSize']) => {
  const stageAspectRatio = stageSize.width / stageSize.height
  const mapAspectRatio = mapSize.width / mapSize.height
  if (stageAspectRatio > mapAspectRatio) {
    return stageSize.height / mapSize.height
  } else {
    return stageSize.width / mapSize.width
  }
}

export const useTwoDMapStore = create<TTwoDMapState & TTwoDMaoActions>((set) => ({
  stageSize: { width: 1920, height: 1080 },
  mapSize: { width: 1920, height: 1080 },
  stageMapRatio: 1,
  currentScale: 1,
  cursorPosition: { x: 0, y: 0 },
  idPointMap: new Map(),
  idLineMap: new Map(),
  stageLeftTopPosition: { x: 0, y: 0 },
  mapCenterPosition: { x: 0, y: 0 },
  settings: {
    [EMapSettingsKeys.IS_LOCATION_VISIBLE]: true,
    [EMapSettingsKeys.IS_POINT_VISIBLE]: false,
    [EMapSettingsKeys.IS_DIRECTION_VISIBLE]: false,
    [EMapSettingsKeys.IS_VEHICLE_OUTLINE_VISIBLE]: false,
    [EMapSettingsKeys.IS_VEHICLE_IMAGE_VISIBLE]: true,
    [EMapSettingsKeys.IS_VEHICLE_BENCHMARK_VISIBLE]: false,
    [EMapSettingsKeys.IS_VEHICLE_ON_WORK_VISIBLE]: true,
    [EMapSettingsKeys.IS_VEHICLE_PLANNING_VISIBLE]: true,
    [EMapSettingsKeys.IS_FAULTY_VEHICLE_VISIBLE]: true,
    [EMapSettingsKeys.IS_VEHICLE_DETAIL_VISIBLE]: true,
    [EMapSettingsKeys.IS_VEHICLE_PLANNING_SINGLE_COLOR]: false,
    [EMapSettingsKeys.IS_DEV_MODE]: false,
    [EMapSettingsKeys.IS_STATION_VISIBLE]: true,
    [EMapSettingsKeys.LINE_COLOR]: '#393c44',
    [EMapSettingsKeys.PLANNING_LINE_COLOR]: '#00abc7'
  },
  setStageSize: (stageSize) =>
    set((state) => ({ stageSize, stageMapRatio: getStageMapRatio(stageSize, state.mapSize) })),
  setMapSize: (mapSize) => set((state) => ({ mapSize, stageMapRatio: getStageMapRatio(state.stageSize, mapSize) })),
  setCurrentScale: (currentScale) => set(() => ({ currentScale })),
  setCursorPosition: (cursorPosition) => set(() => ({ cursorPosition })),
  setPoint: (id, point) =>
    set(({ idPointMap }) => {
      idPointMap.set(id, point)
      return { idPointMap }
    }),
  setLine: (id, line) =>
    set(({ idLineMap }) => {
      idLineMap.set(id, line)
      return { idLineMap }
    }),
  setStageLeftTopPosition: (stageLeftTopPosition) => set(() => ({ stageLeftTopPosition })),
  setMapCenterPosition: (mapCenterPosition) => set(() => ({ mapCenterPosition })),
  setSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } }))
}))

import { create } from 'zustand'

import { ILineProps } from '../components/lines'

type TTwoDMapState = {
  stageSize: { width: number; height: number } // 当前画布宽高
  mapSize: { width: number; height: number } // 当前地图宽高
  stageMapRatio: number // 画布地图比
  currentScale: number // 当前地图缩放
  cursorPosition: { x: number; y: number } // 当前光标在画布中的坐标
  idPointMap: Map<number, { x: number; y: number }> // 点位id坐标map
  idLineMap: Map<number, ILineProps> // 边id map
  stageLeftTopPosition: { x: number; y: number } // 画布左上角
  mapCenterPosition: { x: number; y: number } // 地图中间坐标
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
  setMapCenterPosition: (mapCenterPosition) => set(() => ({ mapCenterPosition }))
}))

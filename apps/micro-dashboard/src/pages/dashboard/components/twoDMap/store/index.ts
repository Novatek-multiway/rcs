import { create } from 'zustand'

type StoreState = {
  stageSize: { width: number; height: number } // 当前画布宽高
  mapSize: { width: number; height: number } // 当前地图宽高
  stageMapRatio: number // 画布地图比
  currentScale: number // 当前地图缩放
  cursorPosition: { x: number; y: number } // 当前光标在画布中的坐标
  idPointMap: Map<number, { x: number; y: number }> // 点位id坐标map
  stageLeftTopPosition: { x: number; y: number } // 画布左上角
  mapCenterPosition: { x: number; y: number } // 地图中间坐标
  setStageSize: (stageSize: StoreState['stageSize']) => void
  setMapSize: (mapSize: StoreState['mapSize']) => void
  setCurrentScale: (currentScale: number) => void
  setCursorPosition: (cursorPosition: StoreState['cursorPosition']) => void
  setPoint: (id: number, point: { x: number; y: number }) => void
  setStageLeftTopPosition: (stageLeftTopPosition: { x: number; y: number }) => void
  setMapCenterPosition: (mapCenterPosition: { x: number; y: number }) => void
}

const getStageMapRatio = (stageSize: StoreState['stageSize'], mapSize: StoreState['mapSize']) => {
  const stageAspectRatio = stageSize.width / stageSize.height
  const mapAspectRatio = mapSize.width / mapSize.height
  if (stageAspectRatio > mapAspectRatio) {
    return stageSize.height / mapSize.height
  } else {
    return stageSize.width / mapSize.width
  }
}

export const useStore = create<StoreState>((set) => ({
  stageSize: { width: 1920, height: 1080 },
  mapSize: { width: 1920, height: 1080 },
  stageMapRatio: 1,
  currentScale: 1,
  cursorPosition: { x: 0, y: 0 },
  idPointMap: new Map(),
  stageLeftTopPosition: { x: 0, y: 0 },
  mapCenterPosition: { x: 0, y: 0 },
  setStageSize: (stageSize) =>
    set((state) => ({ stageSize, stageMapRatio: getStageMapRatio(stageSize, state.mapSize) })),
  setMapSize: (mapSize) => set((state) => ({ mapSize, stageMapRatio: getStageMapRatio(state.stageSize, mapSize) })),
  setCurrentScale: (currentScale) => set(() => ({ currentScale })),
  setCursorPosition: (cursorPosition) => set(() => ({ cursorPosition })),
  setPoint: (id, point) =>
    set((state) => {
      const idPointMap = new Map(state.idPointMap)
      idPointMap.set(id, point)
      return { idPointMap }
    }),
  setStageLeftTopPosition: (stageLeftTopPosition) => set(() => ({ stageLeftTopPosition })),
  setMapCenterPosition: (mapCenterPosition) => set(() => ({ mapCenterPosition }))
}))

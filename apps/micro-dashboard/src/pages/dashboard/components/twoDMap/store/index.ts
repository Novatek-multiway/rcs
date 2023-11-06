import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import { ILineProps } from '../components/lines'
import { EMapSettingsKeys, EStageMode } from '../constants'
import { EDrawingType, TPolygonResult, TRectResult, TResultWrapper } from '../hooks/useKonvaDrawing'
import { useZoom } from '../hooks/useZoom'

export type TTwoDMapState = {
  stageSize: { width: number; height: number } // 当前画布宽高
  mapSize: { width: number; height: number } // 当前地图宽高
  stageMapRatio: number // 画布地图比
  currentScale: number // 当前地图缩放
  zoom: ReturnType<typeof useZoom>['zoom'] | null // 修改地图缩放的方法
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
  settingSwitches: {
    id: number
    label: string
    sort: number
    enabled: boolean
    showed: boolean
    key: EMapSettingsKeys
  }[]
  currentChangedSwitch: TTwoDMapState['settingSwitches'][0] | null
  isDrawingBlockCardOpen: boolean // 是否显示绘制区块窗口
  stageMode: EStageMode // 舞台操作模式
  drawingType: EDrawingType // 绘制模式下的绘图类型
  drawingResultListMap: {
    rect: TResultWrapper<TRectResult>[]
    polygon: TResultWrapper<TPolygonResult>[]
  }
  newDrawingResult: TResultWrapper<TRectResult | TPolygonResult> | null
  drawingSelectedId: string // 当前绘制的区块选中id
  insidePoints: { id: number; x: number; y: number }[] // 在可视区域的点位
  isLoading: boolean
}

type TTwoDMaoActions = {
  setStageSize: (stageSize: TTwoDMapState['stageSize']) => void
  setMapSize: (mapSize: TTwoDMapState['mapSize']) => void
  setCurrentScale: (currentScale: number) => void
  setZoom: (zoom: TTwoDMapState['zoom']) => void
  setCursorPosition: (cursorPosition: TTwoDMapState['cursorPosition']) => void
  setIdPointMap: (idPointMap: TTwoDMapState['idPointMap']) => void
  setIdLineMap: (idLineMap: TTwoDMapState['idLineMap']) => void
  setStageLeftTopPosition: (stageLeftTopPosition: { x: number; y: number }) => void
  setMapCenterPosition: (mapCenterPosition: { x: number; y: number }) => void
  setSettings: (settings: Partial<TTwoDMapState['settings']>) => void
  setSettingSwitches: (settingSwitches: TTwoDMapState['settingSwitches']) => void
  setCurrentChangedSwitch: (currentChangedSwitch: TTwoDMapState['currentChangedSwitch']) => void
  setIsDrawingBlockCardOpen: (isDrawingBlockCardOpen: boolean) => void
  setStageMode: (stageMode: EStageMode) => void
  setDrawingType: (drawingType: EDrawingType) => void
  setDrawingResultListMap: (drawingResultListMap: TTwoDMapState['drawingResultListMap']) => void
  setNewDrawingResult: (newDrawingResult: TTwoDMapState['newDrawingResult']) => void
  setDrawingSelectedId: (drawingSelectedId: TTwoDMapState['drawingSelectedId']) => void
  setInsidePoints: (insidePoints: TTwoDMapState['insidePoints']) => void
  setIsLoading: (isLoading: TTwoDMapState['isLoading']) => void
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

export const useTwoDMapStore = createWithEqualityFn<TTwoDMapState & TTwoDMaoActions>(
  (set) => ({
    stageSize: { width: 1920, height: 1080 },
    mapSize: { width: 1920, height: 1080 },
    stageMapRatio: 1,
    currentScale: 1,
    zoom: null,
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
    settingSwitches: [],
    currentChangedSwitch: null,
    isDrawingBlockCardOpen: false,
    stageMode: EStageMode.DRAG,
    drawingType: EDrawingType.RECT,
    drawingResultListMap: {
      rect: [],
      polygon: []
    },
    newDrawingResult: null,
    drawingSelectedId: '',
    insidePoints: [],
    isLoading: false,
    setStageSize: (stageSize) =>
      set((state) => ({ stageSize, stageMapRatio: getStageMapRatio(stageSize, state.mapSize) })),
    setMapSize: (mapSize) => set((state) => ({ mapSize, stageMapRatio: getStageMapRatio(state.stageSize, mapSize) })),
    setCurrentScale: (currentScale) => set(() => ({ currentScale })),
    setZoom: (zoom) => set(() => ({ zoom })),
    setCursorPosition: (cursorPosition) => set(() => ({ cursorPosition })),
    setIdPointMap: (idPointMap) => set(() => ({ idPointMap })),
    setIdLineMap: (idLineMap) => set(() => ({ idLineMap })),
    setStageLeftTopPosition: (stageLeftTopPosition) => set(() => ({ stageLeftTopPosition })),
    setMapCenterPosition: (mapCenterPosition) => set(() => ({ mapCenterPosition })),
    setSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
    setSettingSwitches: (settingSwitches) => set(() => ({ settingSwitches })),
    setCurrentChangedSwitch: (currentChangedSwitch) => set(() => ({ currentChangedSwitch })),
    setIsDrawingBlockCardOpen: (isDrawingBlockCardOpen) => set(() => ({ isDrawingBlockCardOpen })),
    setStageMode: (stageMode) => set(() => ({ stageMode })),
    setDrawingType: (drawingType) => set(() => ({ drawingType })),
    setDrawingResultListMap: (drawingResultListMap) => set(() => ({ drawingResultListMap })),
    setNewDrawingResult: (newDrawingResult) => set(() => ({ newDrawingResult })),
    setDrawingSelectedId: (drawingSelectedId) => set(() => ({ drawingSelectedId })),
    setInsidePoints: (insidePoints) => set(() => ({ insidePoints })),
    setIsLoading: (isLoading) => set(() => ({ isLoading }))
  }),
  shallow
)

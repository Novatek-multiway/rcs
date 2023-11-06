import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getInitStates, getOnLineCarriers } from 'apis'
import _ from 'lodash'
import React, {
  type ElementRef,
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Group, KonvaNodeEvents, Layer, Rect, Stage } from 'react-konva'

import { EStageMode, POINT_IMAGE_NAME_MAP } from '../../constants'
import { EDrawingType, TRectResult, TResultWrapper, useKonvaDrawing } from '../../hooks/useKonvaDrawing'
import { useShapesInside } from '../../hooks/useShapesInside'
import { useZoom } from '../../hooks/useZoom'
import { useTwoDMapStore } from '../../store'
import Lines, { LineDirections } from '../lines'
import { useLines } from '../lines/useLines'
import { useLinesInside } from '../lines/useLinesInside'
import Points from '../points'
import ImagePoints from '../points/ImagePoints'
import LocationPoints from '../points/LocationPoints'
import { usePoints } from '../points/usePoints'
import Vehicles from '../vehicles'
import { useVehicles } from '../vehicles/useVehicles'
interface IInternalStageProps {
  width: number
  height: number
}

const INIT_SCALE = 6
const SCALE_BOUNDARY = 6.5 // 缩放显示边界（低于一定缩放值，部分元素不显示，提升初始化渲染性能）
const SELECTED_FILL_COLOR = 'rgba(0, 203, 202, 0.2)'
const InternalStage: FC<PropsWithChildren<IInternalStageProps>> = (props) => {
  const { width, height } = props
  const stageRef = useRef<ElementRef<typeof Stage>>(null)
  const { currentScale, zoom } = useZoom(stageRef)
  const {
    settings,
    setMapSize,
    setMapCenterPosition,
    setInsidePoints,
    globalCurrentScale,
    setCurrentScale,
    setStageSize,
    setCursorPosition,
    setStageLeftTopPosition,
    stageMode,
    drawingType,
    drawingResultListMap,
    setDrawingResultListMap,
    drawingSelectedId,
    setDrawingSelectedId
  } = useTwoDMapStore((state) => ({
    settings: state.settings,
    setMapSize: state.setMapSize,
    setMapCenterPosition: state.setMapCenterPosition,
    setInsidePoints: state.setInsidePoints,
    globalCurrentScale: state.currentScale,
    setCurrentScale: state.setCurrentScale,
    setStageSize: state.setStageSize,
    setCursorPosition: state.setCursorPosition,
    setStageLeftTopPosition: state.setStageLeftTopPosition,
    stageMode: state.stageMode,
    drawingType: state.drawingType,
    drawingResultListMap: state.drawingResultListMap,
    setDrawingResultListMap: state.setDrawingResultListMap,
    drawingSelectedId: state.drawingSelectedId,
    setDrawingSelectedId: state.setDrawingSelectedId
  }))

  useUpdateEffect(() => {
    // 同步scale到全局
    setCurrentScale(currentScale)
  }, [currentScale, setCurrentScale])

  useUpdateEffect(() => {
    // 同步stage到全局
    setStageSize({
      width,
      height
    })
  }, [width, height])

  useUpdateEffect(() => {
    zoom(globalCurrentScale)
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { x, y } = stageRef.current?.absolutePosition()!
    setStageLeftTopPosition({ x: -x / globalCurrentScale, y: -y / globalCurrentScale })
  }, [globalCurrentScale])

  const handleMouseMove = useCallback<NonNullable<KonvaNodeEvents['onMouseMove']>>(() => {
    const position = stageRef.current?.getRelativePointerPosition()
    setCursorPosition(position!)
  }, [setCursorPosition])

  const handleDragEnd = useCallback<NonNullable<KonvaNodeEvents['onDragEnd']>>(
    (e) => {
      const { x, y } = e.target.position()
      setStageLeftTopPosition({ x: -x / globalCurrentScale, y: -y / globalCurrentScale })
    },
    [setStageLeftTopPosition, globalCurrentScale]
  )

  // 设置初始缩放
  useEffect(() => {
    zoom(INIT_SCALE, { targetPosition: { x: 0, y: 0 } })
  }, [zoom])

  /* ---------------------------------- 地图数据 ---------------------------------- */
  const [mapData, setMapData] = useState<MapAPI.RootMapObject | null>(null)
  const vertexes = useMemo(() => mapData?.Vertexs || [], [mapData])
  const edges = useMemo(() => mapData?.Edges || [], [mapData])

  /* ---------------------------------- 地图信息 ---------------------------------- */
  /* ---------------------------------- 车辆数据 ---------------------------------- */
  const [vehiclesData, setVehiclesData] = useState<ReportAPI.OnlineCarrier[]>([])
  /* ---------------------------------- 车辆数据 ---------------------------------- */
  useAsyncEffect(async () => {
    const mapRes = await getInitStates()
    const vehiclesRes = await getOnLineCarriers()
    const mapData: MapAPI.RootMapObject = JSON.parse(mapRes.data)
    const vehiclesData: ReportAPI.OnlineCarrier[] = vehiclesRes.data
    setMapData(mapData)
    setVehiclesData(vehiclesData)
  }, [])

  useUpdateEffect(() => {
    if (!mapData) return
    const { DWGMaxX, DWGMinX, DWGMaxY, DWGMinY } = mapData.MapOption
    const mapSize = { width: Math.abs(DWGMaxX - DWGMinX), height: Math.abs(DWGMaxY - DWGMinY) }
    setMapSize(mapSize)
    const mapCenterPosition = { x: DWGMinX + mapSize.width / 2, y: DWGMinY + mapSize.height / 2 }
    setMapCenterPosition(mapCenterPosition)
  }, [setMapSize, setMapCenterPosition, mapData])

  /* ----------------------------------- 点位 ----------------------------------- */
  const points = usePoints(vertexes)
  const insidePoints = useShapesInside(points)
  useUpdateEffect(() => {
    setInsidePoints([...insidePoints])
  }, [insidePoints])
  // 停车点、充点电
  const imagePoints = useMemo(
    () =>
      insidePoints
        .filter((p) => !!POINT_IMAGE_NAME_MAP[p.type])
        .map((p) => ({ ...p, pointImageName: POINT_IMAGE_NAME_MAP[p.type] })),
    [insidePoints]
  )
  // 库位点
  const locationPoint = useMemo(() => insidePoints.filter((p) => p.type === 1 || p.type === 4), [insidePoints])
  /* ----------------------------------- 点位 ----------------------------------- */

  /* ----------------------------------- 边 ----------------------------------- */
  const lines = useLines(edges)
  const insideLines = useLinesInside(lines)
  const lineDirections = insideLines.flatMap((line) => line.directions)
  /* ----------------------------------- 边 ----------------------------------- */

  /* ----------------------------------- 车辆 ----------------------------------- */
  const vehicles = useVehicles(vehiclesData, {
    carrierPlanningFilter: (planning) => (settings.isDevMode ? true : planning.state1 === 0)
  })
  const insideVehicles = useShapesInside(vehicles, (originInsideFilter) => {
    // 车或车的路径在可见范围，则要显示当前车辆
    return (vehicle) => {
      // 如果 isFaultyVehicleVisible为false, 不显示异常车辆,
      if (!settings.isFaultyVehicleVisible && vehicle.statusName === '异常') {
        return false
      }
      // 没有规划路线的车辆，只需要判断车辆是否在可见范围内，不需要判断线路是否在可见范围内
      if (!vehicle.lines?.length) {
        return originInsideFilter(vehicle)
      }
      // 如果isVehicleOnWorkVisible为false, 不显示带规划路线的工作车辆, 也可理解成工作车辆不能在可见范围
      if (!settings.isVehicleOnWorkVisible) return false

      return (
        originInsideFilter(vehicle) ||
        vehicle.lines
          .flatMap((line) => _.chunk(line.points, 2).map((point) => ({ x: point[0], y: point[1] })))
          .some(originInsideFilter)
      )
    }
  })
  /* ----------------------------------- 车辆 ----------------------------------- */

  /* ---------------------------------- 绘制区域 ---------------------------------- */
  const isDrawingMode = useMemo(() => stageMode === EStageMode.DRAW, [stageMode])
  const { drawResult, isDrawing } = useKonvaDrawing(stageRef, {
    type: drawingType,
    disabled: !isDrawingMode,
    onDrawEnd: (drawResult) => {
      const newDrawingResultListMap = { ...drawingResultListMap }
      if (drawResult.type === EDrawingType.RECT) {
        const drawResultList = newDrawingResultListMap[drawResult.type] || []
        drawResultList.push(drawResult as TResultWrapper<TRectResult>)
      }
      setDrawingResultListMap(newDrawingResultListMap)
    }
  })

  const rectStyle = useMemo(
    () => ({
      fill: 'transparent',
      stroke: 'rgb(0, 203, 202)',
      strokeWidth: 0.3,
      shadowColor: '#00cbca',
      shadowBlur: 10,
      shadowOffset: { x: 0, y: 0 },
      shadowOpacity: 0.5
    }),
    []
  )
  const getFill = useCallback(
    (id: string) => (drawingSelectedId === id ? SELECTED_FILL_COLOR : 'transparent'),
    [drawingSelectedId]
  )
  /* ---------------------------------- 绘制区域 ---------------------------------- */
  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      draggable={stageMode === EStageMode.DRAG}
      onMouseMove={handleMouseMove}
      onDragEnd={handleDragEnd}
    >
      {/* 不需要改变的层 */}
      <Layer listening={false}>
        <Lines
          lines={insideLines}
          stroke={settings.isVehiclePlanningSingleColor ? settings.lineColor : undefined}
          strokeWidth={currentScale >= SCALE_BOUNDARY ? 0.1 : 3 / currentScale}
        />
      </Layer>

      {/* 改变频率低的层
        缩放值小于边界时隐藏， 提升显示元素多时的性能
        */}
      {currentScale >= SCALE_BOUNDARY && (
        <Layer listening={false}>
          {settings.isLocationVisible && <LocationPoints points={locationPoint} />}
          {settings.isPointVisible && <Points points={insidePoints} />}
          {settings.isStationVisible && <ImagePoints points={imagePoints} />}
          {settings.isDirectionVisible && <LineDirections directions={lineDirections} />}
        </Layer>
      )}

      {/* 改变频率高的层 */}
      <Layer>
        <Vehicles
          vehicles={insideVehicles}
          stroke={settings.isVehiclePlanningSingleColor ? settings.planningLineColor : undefined}
          strokeWidth={currentScale >= SCALE_BOUNDARY ? 0.1 : 3 / currentScale}
          showImage={settings.isVehicleImageVisible}
          showOutline={settings.isVehicleOutlineVisible}
          showLines={settings.isVehiclePlanningVisible}
          showTooltip={settings.isVehicleDetailVisible}
        />
      </Layer>
      {/* 绘制层 */}
      <Layer>
        {/* 当前正在绘制的图形 */}
        {isDrawing && (
          <Group>
            {drawingType === EDrawingType.RECT && <Rect {...rectStyle} {...(drawResult?.data as TRectResult)}></Rect>}
          </Group>
        )}
        {/* 已经绘制完的图形 */}
        <Group>
          {drawingResultListMap[EDrawingType.RECT].map((rectDrawResult) => (
            <Rect
              key={rectDrawResult?.id}
              {...rectStyle}
              {...rectDrawResult?.data}
              fill={getFill(rectDrawResult.id)}
              onMouseEnter={() => setDrawingSelectedId(rectDrawResult.id)}
              onMouseLeave={() => setDrawingSelectedId('')}
            ></Rect>
          ))}
        </Group>
      </Layer>
    </Stage>
  )
}

export default memo(InternalStage)

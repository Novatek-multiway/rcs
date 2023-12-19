import { useUpdateEffect } from 'ahooks'
import _ from 'lodash'
import React, { type ElementRef, FC, memo, PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react'
import { Group, KonvaNodeEvents, Layer, Line, Rect, Stage } from 'react-konva'

// import map from '@/mock/map.json'
// import vehicles from '@/mock/vehicles.json'
import { EStageMode, POINT_IMAGE_NAME_MAP } from '../../constants'
import { EDrawingType, TPolygonResult, TRectResult, TResultWrapper, useKonvaDrawing } from '../../hooks/useKonvaDrawing'
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
export interface IInternalStageProps {
  mapData: MapAPI.RootMapObject | null
  vehiclesData: ReportAPI.OnlineCarrier[]
  width: number
  height: number
}

// const mapData = JSON.parse((map as any).data) as MapAPI.RootMapObject
// const vehiclesData = vehicles.data as ReportAPI.OnlineCarrier[]

const SCALE_BOUNDARY = 6.5 // 缩放显示边界（低于一定缩放值，部分元素不显示，提升初始化渲染性能）
const SELECTED_FILL_COLOR = 'rgba(0, 203, 202, 0.2)'
const InternalStage: FC<PropsWithChildren<IInternalStageProps>> = (props) => {
  const { width, height, mapData, vehiclesData = [] } = props
  const stageRef = useRef<ElementRef<typeof Stage>>(null)
  const { currentScale, zoom } = useZoom(stageRef)
  const {
    settings,
    setInsidePoints,
    globalCurrentScale,
    setCurrentScale,
    setZoom,
    setStageSize,
    stageMapRatio,
    setCursorPosition,
    setStageLeftTopPosition,
    stageMode,
    drawingType,
    drawingResultListMap,
    setDrawingResultListMap,
    setNewDrawingResult,
    drawingSelectedId,
    setDrawingSelectedId,
    lastCenter,
    setLastCenter,
    mapSize
  } = useTwoDMapStore((state) => ({
    settings: state.settings,
    setInsidePoints: state.setInsidePoints,
    globalCurrentScale: state.currentScale,
    setCurrentScale: state.setCurrentScale,
    setZoom: state.setZoom,
    setStageSize: state.setStageSize,
    stageMapRatio: state.stageMapRatio,
    setCursorPosition: state.setCursorPosition,
    setStageLeftTopPosition: state.setStageLeftTopPosition,
    stageMode: state.stageMode,
    drawingType: state.drawingType,
    drawingResultListMap: state.drawingResultListMap,
    setDrawingResultListMap: state.setDrawingResultListMap,
    setNewDrawingResult: state.setNewDrawingResult,
    drawingSelectedId: state.drawingSelectedId,
    setDrawingSelectedId: state.setDrawingSelectedId,
    lastCenter: state.lastCenter,
    setLastCenter: state.setLastCenter,
    mapSize: state.mapSize
  }))

  useUpdateEffect(() => {
    // 同步scale\zoom方法到全局
    setCurrentScale(currentScale)
    setZoom(zoom)
  }, [currentScale, setCurrentScale, zoom, setZoom])

  useUpdateEffect(() => {
    // 同步stage到全局
    setStageSize({
      width,
      height
    })
  }, [width, height])

  useUpdateEffect(() => {
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

  useEffect(() => {
    if (stageRef.current) {
      const x = 0
      const y = mapSize.height * stageMapRatio
      stageRef.current!.position({ x, y })
      setStageLeftTopPosition({
        x: -x,
        y: -y
      })
    }
  }, [mapSize.height, stageMapRatio, setStageLeftTopPosition])

  /* ---------------------------------- 地图数据 ---------------------------------- */
  const vertexes = useMemo(() => {
    let vertexes = mapData?.Vertexs || []
    if (vertexes.length > 0) {
      vertexes = vertexes.map((v) => ({ ...v, Y: -v.Y }))
    }

    return vertexes
  }, [mapData])
  const edges = useMemo(() => {
    const edges = mapData?.Edges || []
    if (edges.length > 0) {
      edges.forEach((edge) => {
        edge.ControlPoint = edge.ControlPoint.map((cp) => ({ ...cp, Y: -cp.Y }))
      })
    }
    return edges
  }, [mapData])
  /* ---------------------------------- 地图信息 ---------------------------------- */

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
  const yReversedVehiclesData = useMemo(() => vehiclesData.map((v) => ({ ...v, y: -v.y })), [vehiclesData])
  const vehicles = useVehicles(yReversedVehiclesData, {
    carrierPlanningFilter: (planning) => {
      /**
       * 0-已规划  6-已分配 7-交管确认 3-已下发  4-行驶中 1-事件失败  2-被交管  5-已路过
       */
      const invisiblePlanningState = []
      if (!settings.isDevMode) {
        invisiblePlanningState.push(0, 6, 7, 4, 1, 2, 5)
      }
      if (!settings.isVehiclePlanningVisible) {
        invisiblePlanningState.push(3)
      }
      return !invisiblePlanningState.includes(planning.state1)
    }
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
        setNewDrawingResult(drawResult)
      } else if (drawResult.type === EDrawingType.POLYGON) {
        const drawResultList = newDrawingResultListMap[drawResult.type] || []
        drawResultList.push(drawResult as TResultWrapper<TPolygonResult>)
        setNewDrawingResult(drawResult)
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
  const lineStyle = useMemo(
    () => ({
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

  /* ---------------------------------- 搜索居中 ---------------------------------- */
  useUpdateEffect(() => {
    const stage = stageRef.current
    const stagePosition = stage?.getPosition()
    if (!stagePosition || !stage || !lastCenter) return
    const offsetX = stage?.width() / 2 - lastCenter.x * currentScale
    const offsetY = stage?.height() / 2 - lastCenter.y * currentScale
    const newPosition = {
      x: offsetX,
      y: offsetY
    }
    stage.position(newPosition)
    // 更新stageLeftTopPosition， 从而更新当前可视节点
    const { x, y } = stage.absolutePosition()
    setStageLeftTopPosition({ x: -x / globalCurrentScale, y: -y / globalCurrentScale })
    setLastCenter(null)
  }, [lastCenter, currentScale, setLastCenter, setStageLeftTopPosition])
  /* ---------------------------------- 搜索居中 ---------------------------------- */
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
       */}
      {
        <Layer listening={false}>
          {settings.isLocationVisible && <LocationPoints points={locationPoint} />}
          {/* 缩放值小于边界时隐藏， 提升显示元素多时的性能 */}
          {currentScale >= SCALE_BOUNDARY && (
            <>
              {settings.isPointVisible && <Points points={insidePoints} />}
              {settings.isStationVisible && <ImagePoints points={imagePoints} />}
              {settings.isDirectionVisible && <LineDirections directions={lineDirections} />}
            </>
          )}
        </Layer>
      }

      {/* 改变频率高的层 */}
      <Layer>
        <Vehicles
          vehicles={insideVehicles}
          stroke={settings.isVehiclePlanningSingleColor ? settings.planningLineColor : undefined}
          strokeWidth={currentScale >= SCALE_BOUNDARY ? 0.1 : 3 / currentScale}
          showImage={settings.isVehicleImageVisible}
          showOutline={settings.isVehicleOutlineVisible}
          // showLines={settings.isVehiclePlanningVisible}
          showTooltip={settings.isVehicleDetailVisible}
          showBenchmarks={settings.isVehicleBenchmarkVisible}
        />
      </Layer>
      {/* 绘制层 */}
      <Layer>
        {/* 当前正在绘制的图形 */}
        {isDrawing && (
          <Group>
            {drawingType === EDrawingType.RECT && <Rect {...rectStyle} {...(drawResult?.data as TRectResult)}></Rect>}
            {drawingType === EDrawingType.POLYGON && (
              <Line points={drawResult?.data as TPolygonResult} {...lineStyle} closed />
            )}
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
          {drawingResultListMap[EDrawingType.POLYGON].map((polygonDrawResult) => (
            <Line
              closed
              key={polygonDrawResult?.id}
              {...lineStyle}
              points={polygonDrawResult?.data || []}
              fill={getFill(polygonDrawResult.id)}
              onMouseEnter={() => setDrawingSelectedId(polygonDrawResult.id)}
              onMouseLeave={() => setDrawingSelectedId('')}
            />
          ))}
        </Group>
      </Layer>
    </Stage>
  )
}

export default memo(InternalStage)

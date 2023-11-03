import _ from 'lodash'
import React, { FC, memo, PropsWithChildren, useEffect, useMemo } from 'react'
import { Layer } from 'react-konva'

import map from '@/mock/map.json'
import vehicles from '@/mock/vehicles.json'

import AutoResizerStage from './components/autoResizerStage'
import CursorPosition from './components/cursorPosition'
import Lines, { LineDirections } from './components/lines'
import { useLines } from './components/lines/useLines'
import { useLinesInside } from './components/lines/useLinesInside'
import MeasuringScale from './components/measuringScale'
import Points from './components/points'
import ImagePoints from './components/points/ImagePoints'
import LocationPoints from './components/points/LocationPoints'
import { usePoints } from './components/points/usePoints'
import Toolbar from './components/toolbar'
import Vehicles from './components/vehicles'
import { useVehicles } from './components/vehicles/useVehicles'
import { POINT_IMAGE_NAME_MAP } from './constants'
import { useShapesInside } from './hooks/useShapesInside'
import { useTwoDMapStore } from './store'
import { TwoDMapWrapper } from './style'

const mapData = JSON.parse((map as any).data) as MapAPI.RootMapObject
const vehiclesData = vehicles.data as ReportAPI.OnlineCarrier[]

interface ITwoDMapProps {
  toolbarRight?: number
}

const SCALE_BOUNDARY = 6.5 // 缩放显示边界（低于一定缩放值，部分元素不显示，提升初始化渲染性能）
// 2D地图
const TwoDMap: FC<PropsWithChildren<ITwoDMapProps>> = (props) => {
  const { toolbarRight = 300 } = props

  const { currentScale, settings, setMapSize, setMapCenterPosition } = useTwoDMapStore((state) => ({
    currentScale: state.currentScale,
    settings: state.settings,
    setMapSize: state.setMapSize,
    setMapCenterPosition: state.setMapCenterPosition
  }))

  useEffect(() => {
    const { DWGMaxX, DWGMinX, DWGMaxY, DWGMinY } = mapData.MapOption
    const mapSize = { width: Math.abs(DWGMaxX - DWGMinX), height: Math.abs(DWGMaxY - DWGMinY) }
    setMapSize(mapSize)
    const mapCenterPosition = { x: DWGMinX + mapSize.width / 2, y: DWGMinY + mapSize.height / 2 }
    setMapCenterPosition(mapCenterPosition)
  }, [setMapSize, setMapCenterPosition])

  /* ----------------------------------- 点位 ----------------------------------- */
  const points = usePoints(mapData.Vertexs)
  const insidePoints = useShapesInside(points)
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
  const lines = useLines(mapData.Edges)
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

  return (
    <TwoDMapWrapper>
      <AutoResizerStage>
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
      </AutoResizerStage>
      {/* 光标位置 */}
      <CursorPosition />
      {/* 比例尺 */}
      <MeasuringScale />
      {/* 工具栏 */}
      <Toolbar toolbarRight={toolbarRight} />
    </TwoDMapWrapper>
  )
}

export default memo(TwoDMap)

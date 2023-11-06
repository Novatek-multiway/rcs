import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getInitStates, getOnLineCarriers } from 'apis'
import React, { FC, memo, PropsWithChildren, useState } from 'react'
import { CircularProgress } from 'ui'

import AutoResizerStage from './components/autoResizerStage'
import CursorPosition from './components/cursorPosition'
import DrawingBlockCard from './components/drawingBlockCard'
import MeasuringScale from './components/measuringScale'
import Toolbar from './components/toolbar'
import { useTwoDMapStore } from './store'
import { TwoDMapWrapper } from './style'

interface ITwoDMapProps {
  toolbarRight?: number
}

// 2D地图
const TwoDMap: FC<PropsWithChildren<ITwoDMapProps>> = (props) => {
  const { toolbarRight = 300 } = props
  const { isLoading, setIsLoading, setMapSize, setMapCenterPosition } = useTwoDMapStore((state) => ({
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
    setMapSize: state.setMapSize,
    setMapCenterPosition: state.setMapCenterPosition
  }))

  const [mapData, setMapData] = useState<MapAPI.RootMapObject | null>(null)
  /* ---------------------------------- 车辆数据 ---------------------------------- */
  const [vehiclesData, setVehiclesData] = useState<ReportAPI.OnlineCarrier[]>([])
  /* ---------------------------------- 车辆数据 ---------------------------------- */

  useAsyncEffect(async () => {
    setIsLoading(true)
    const mapRes = await getInitStates()
    const vehiclesRes = await getOnLineCarriers()
    setIsLoading(false)
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

  return (
    <TwoDMapWrapper>
      <AutoResizerStage mapData={mapData} vehiclesData={vehiclesData}></AutoResizerStage>
      {/* 光标位置 */}
      <CursorPosition />
      {/* 比例尺 */}
      <MeasuringScale />
      {/* 工具栏 */}
      <Toolbar toolbarRight={toolbarRight} />
      {/* 绘制区块窗口 */}
      <DrawingBlockCard />
      {/* loading */}
      {isLoading && (
        <CircularProgress
          color="inherit"
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </TwoDMapWrapper>
  )
}

export default memo(TwoDMap)

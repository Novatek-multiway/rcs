import React, { FC, memo, PropsWithChildren } from 'react'

// import map from '@/mock/map.json'
// import vehicles from '@/mock/vehicles.json'
import AutoResizerStage from './components/autoResizerStage'
import CursorPosition from './components/cursorPosition'
import DrawingBlockCard from './components/drawingBlockCard'
import MeasuringScale from './components/measuringScale'
import Toolbar from './components/toolbar'
import { TwoDMapWrapper } from './style'

// const mapData = JSON.parse((map as any).data) as MapAPI.RootMapObject
// const vehiclesData = vehicles.data as ReportAPI.OnlineCarrier[]

interface ITwoDMapProps {
  toolbarRight?: number
}

// 2D地图
const TwoDMap: FC<PropsWithChildren<ITwoDMapProps>> = (props) => {
  const { toolbarRight = 300 } = props

  return (
    <TwoDMapWrapper>
      <AutoResizerStage></AutoResizerStage>
      {/* 光标位置 */}
      <CursorPosition />
      {/* 比例尺 */}
      <MeasuringScale />
      {/* 工具栏 */}
      <Toolbar toolbarRight={toolbarRight} />
      {/* 绘制区块窗口 */}
      <DrawingBlockCard />
    </TwoDMapWrapper>
  )
}

export default memo(TwoDMap)

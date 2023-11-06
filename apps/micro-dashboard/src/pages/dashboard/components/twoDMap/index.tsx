import React, { FC, memo, PropsWithChildren } from 'react'
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
  const isLoading = useTwoDMapStore((state) => state.isLoading)

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

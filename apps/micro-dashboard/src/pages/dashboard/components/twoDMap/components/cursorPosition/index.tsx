import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import { useTwoDMapStore } from '../../store'
import { CursorPositionWrapper } from './style'

interface ICursorPositionProps {}

const CursorPosition: FC<PropsWithChildren<ICursorPositionProps>> = () => {
  const { cursorPosition, stageMapRatio } = useTwoDMapStore((state) => ({
    cursorPosition: state.cursorPosition,
    stageMapRatio: state.stageMapRatio
  }))
  return (
    <CursorPositionWrapper>
      {(cursorPosition.x / stageMapRatio).toFixed(2)},{(cursorPosition.y / stageMapRatio).toFixed(2)}
    </CursorPositionWrapper>
  )
}

export default memo(CursorPosition)

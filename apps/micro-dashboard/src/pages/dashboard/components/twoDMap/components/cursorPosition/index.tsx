import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import { useStore } from '../../store'
import { CursorPositionWrapper } from './style'

interface ICursorPositionProps {}

const CursorPosition: FC<PropsWithChildren<ICursorPositionProps>> = () => {
  const { cursorPosition, stageMapRatio } = useStore((state) => ({
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

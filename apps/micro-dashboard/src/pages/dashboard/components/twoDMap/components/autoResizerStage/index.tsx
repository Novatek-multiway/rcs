import { useUpdateEffect } from 'ahooks'
import React, { type ElementRef, FC, memo, PropsWithChildren, useCallback, useRef } from 'react'
import { KonvaNodeEvents, Stage } from 'react-konva'
import AutoSizer from 'react-virtualized-auto-sizer'

import { useZoom } from '../../hooks/useZoom'
import { useStore } from '../../store'
interface IInternalStageProps {
  width: number
  height: number
}

const InternalStage: FC<PropsWithChildren<IInternalStageProps>> = (props) => {
  const { width, height, children } = props
  const stageRef = useRef<ElementRef<typeof Stage>>(null)
  const { currentScale, zoom } = useZoom(stageRef)
  const { globalCurrentScale, setCurrentScale, setStageSize, setCursorPosition } = useStore((state) => ({
    globalCurrentScale: state.currentScale,
    setCurrentScale: state.setCurrentScale,
    setStageSize: state.setStageSize,
    setCursorPosition: state.setCursorPosition
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
  }, [globalCurrentScale])

  const handleMouseMove = useCallback<NonNullable<KonvaNodeEvents['onMouseMove']>>(() => {
    const position = stageRef.current?.getRelativePointerPosition()
    setCursorPosition(position!)
  }, [setCursorPosition])
  return (
    <Stage ref={stageRef} width={width} height={height} draggable onMouseMove={handleMouseMove}>
      {children}
    </Stage>
  )
}

const AutoResizerStage = (props: PropsWithChildren) => (
  <AutoSizer>
    {({ height, width }) => (
      <InternalStage width={width} height={height}>
        {props.children}
      </InternalStage>
    )}
  </AutoSizer>
)

export default memo(AutoResizerStage)

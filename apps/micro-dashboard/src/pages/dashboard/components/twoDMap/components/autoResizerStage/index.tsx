import { useUpdateEffect } from 'ahooks'
import React, { type ElementRef, FC, memo, PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { KonvaNodeEvents, Stage } from 'react-konva'
import AutoSizer from 'react-virtualized-auto-sizer'

import { useZoom } from '../../hooks/useZoom'
import { useTwoDMapStore } from '../../store'
interface IInternalStageProps {
  width: number
  height: number
}

const INIT_SCALE = 6
const InternalStage: FC<PropsWithChildren<IInternalStageProps>> = memo((props) => {
  const { width, height, children } = props
  const stageRef = useRef<ElementRef<typeof Stage>>(null)
  const { currentScale, zoom } = useZoom(stageRef)
  const { globalCurrentScale, setCurrentScale, setStageSize, setCursorPosition, setStageLeftTopPosition } =
    useTwoDMapStore((state) => ({
      globalCurrentScale: state.currentScale,
      setCurrentScale: state.setCurrentScale,
      setStageSize: state.setStageSize,
      setCursorPosition: state.setCursorPosition,
      setStageLeftTopPosition: state.setStageLeftTopPosition
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
  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      draggable
      onMouseMove={handleMouseMove}
      onDragEnd={handleDragEnd}
    >
      {children}
    </Stage>
  )
})

const AutoResizerStage = (props: PropsWithChildren) => (
  <AutoSizer defaultWidth={window.innerWidth} defaultHeight={window.innerHeight}>
    {({ height, width }) => {
      return (
        width &&
        height && (
          <InternalStage width={width} height={height}>
            {props.children}
          </InternalStage>
        )
      )
    }}
  </AutoSizer>
)

export default memo(AutoResizerStage)

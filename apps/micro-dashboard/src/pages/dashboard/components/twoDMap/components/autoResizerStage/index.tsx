import { useUpdateEffect } from 'ahooks'
import React, { type ElementRef, FC, memo, PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { Circle, KonvaNodeEvents, Layer, Stage } from 'react-konva'
import AutoSizer from 'react-virtualized-auto-sizer'

import { useZoom } from '../../hooks/useZoom'
import { useStore } from '../../store'
interface IInternalStageProps {
  width: number
  height: number
}

const INIT_SCALE = 6
const InternalStage: FC<PropsWithChildren<IInternalStageProps>> = (props) => {
  const { width, height, children } = props
  const stageRef = useRef<ElementRef<typeof Stage>>(null)
  const { currentScale, zoom } = useZoom(stageRef)
  const {
    globalCurrentScale,
    stageLeftTopPosition,
    mapCenterPosition,
    stageMapRatio,
    setCurrentScale,
    setStageSize,
    setCursorPosition,
    setStageLeftTopPosition
  } = useStore((state) => ({
    globalCurrentScale: state.currentScale,
    stageLeftTopPosition: state.stageLeftTopPosition,
    mapCenterPosition: state.mapCenterPosition,
    stageMapRatio: state.stageMapRatio,
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
    zoom(INIT_SCALE)
  }, [mapCenterPosition, zoom, stageMapRatio])
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
      <Layer>
        <Circle fill="red" width={10} height={10} x={stageLeftTopPosition.x} y={stageLeftTopPosition.y} />
      </Layer>
    </Stage>
  )
}

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

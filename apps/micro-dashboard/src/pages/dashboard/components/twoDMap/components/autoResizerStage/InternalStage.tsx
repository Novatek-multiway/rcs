import { useUpdateEffect } from 'ahooks'
import React, {
  type ElementRef,
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Group, KonvaNodeEvents, Layer, Rect, Stage } from 'react-konva'

import {
  EDrawingType,
  TPolygonResult,
  TRectResult,
  TResultKey,
  TResultWrapper,
  useKonvaDrawing
} from '../../hooks/useKonvaDrawing'
import { useZoom } from '../../hooks/useZoom'
import { useTwoDMapStore } from '../../store'
interface IInternalStageProps {
  width: number
  height: number
}

const INIT_SCALE = 6
const InternalStage: FC<PropsWithChildren<IInternalStageProps>> = (props) => {
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

  /* ---------------------------------- 绘制区域 ---------------------------------- */
  const [isDrawingMode] = useState(false)
  const [drawType] = useState<TResultKey>(EDrawingType.RECT)
  const { drawResult, isDrawing } = useKonvaDrawing(stageRef, {
    type: drawType,
    disabled: !isDrawingMode,
    onDrawEnd: (drawResult) => {
      const newDrawResultListMap = { ...drawResultListMap }
      if (drawResult.type === EDrawingType.RECT) {
        const drawResultList = drawResultListMap[drawResult.type] || []
        drawResultList.push(drawResult as TResultWrapper<TRectResult>)
      }
      setDrawResultListMap(newDrawResultListMap)
    }
  })
  const [drawResultListMap, setDrawResultListMap] = useState<{
    rect: TResultWrapper<TRectResult>[]
    polygon: TResultWrapper<TPolygonResult>[]
  }>({
    rect: [],
    polygon: []
  })

  const rectStyle = useMemo(
    () => ({
      fill: 'transparent',
      stroke: '#00cbca',
      strokeWidth: 0.3,
      shadowColor: '#00cbca',
      shadowBlur: 10,
      shadowOffset: { x: 0, y: 0 },
      shadowOpacity: 0.5
    }),
    []
  )

  /* ---------------------------------- 绘制区域 ---------------------------------- */
  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      // draggable
      onMouseMove={handleMouseMove}
      onDragEnd={handleDragEnd}
    >
      {children}
      {/* 绘制层 */}
      <Layer>
        {/* 当前正在绘制的图形 */}
        {isDrawing && (
          <Group>
            {drawType === EDrawingType.RECT && <Rect {...rectStyle} {...(drawResult?.data as TRectResult)}></Rect>}
          </Group>
        )}
        {/* 已经绘制完的图形 */}
        <Group>
          {drawResultListMap[EDrawingType.RECT].map((rectDrawResult) => (
            <Rect key={rectDrawResult?.id} {...rectStyle} {...rectDrawResult?.data}></Rect>
          ))}
        </Group>
      </Layer>
    </Stage>
  )
}

export default memo(InternalStage)

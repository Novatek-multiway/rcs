import { KonvaEventListener } from 'konva/lib/Node'
import { Stage } from 'konva/lib/Stage'
import _ from 'lodash'
import { RefObject, useCallback, useEffect, useState } from 'react'

import { EDrawingType, TResult, TResultKey } from './types'
import { getDrawRectData } from './utils'

/**
 * @description: 绘制Konva 图形, 根据传入的type，返回绘制对应图形所需要的数据
 * @return {*}
 */
export function useKonvaDrawing<T extends TResultKey>(
  stageRef: RefObject<Stage>,
  options: {
    type: T
    disabled?: boolean
    onDrawEnd?: (result: TResult[T]) => void
  }
) {
  const { type, disabled = false, onDrawEnd } = options ?? {}
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawPoints, setDrawPoints] = useState<number[]>([]) // 绘制的点
  const [drawResult, setDrawResult] = useState<TResult[T]>() // 绘制的结果
  const handleMouseDown = useCallback<KonvaEventListener<Stage, any>>(
    (e) => {
      e.evt.preventDefault()
      if (disabled) return
      if (stageRef.current) {
        const stage = stageRef.current
        setIsDrawing(true)
        const pointerPosition = stage.getPointerPosition()

        if (pointerPosition) {
          const mouseDownX = (pointerPosition.x - stage.x()) / stage.scaleX()
          const mouseDownY = (pointerPosition.y - stage.y()) / stage.scaleX()

          if (type === EDrawingType.RECT) {
            const rectData = getDrawRectData(mouseDownX, mouseDownY, mouseDownX, mouseDownY)
            const rectResult = { id: _.uniqueId(type), type, data: rectData } as TResult[T]
            setDrawResult(rectResult)
            setDrawPoints([mouseDownX, mouseDownY])
          }
        }
      }
    },
    [stageRef, type, disabled]
  )
  const handleMouseMove = useCallback<KonvaEventListener<Stage, any>>(
    (e) => {
      e.evt.preventDefault()
      if (disabled) return
      if (stageRef.current) {
        const stage = stageRef.current
        if (!isDrawing) return

        const pointerPosition = stage.getPointerPosition()
        if (pointerPosition) {
          const mouseMoveX = (pointerPosition.x - stage.x()) / stage.scaleX()
          const mouseMoveY = (pointerPosition.y - stage.y()) / stage.scaleX()

          if (type === EDrawingType.RECT) {
            const [mouseDownX, mouseDownY] = drawPoints
            const rectData = getDrawRectData(mouseDownX, mouseDownY, mouseMoveX, mouseMoveY)
            const rectResult = { id: _.uniqueId(type), type, data: rectData } as TResult[T]
            setDrawResult(rectResult)
          }
        }
      }
    },
    [stageRef, type, drawPoints, isDrawing, disabled]
  )
  const handleMouseUp = useCallback<KonvaEventListener<Stage, any>>(
    (e) => {
      e.evt.preventDefault()
      if (disabled) return
      if (stageRef.current) {
        const stage = stageRef.current
        if (!isDrawing) return

        const pointerPosition = stage.getPointerPosition()
        if (pointerPosition) {
          e.evt.preventDefault()
          const mouseUpX = (pointerPosition.x - stage.x()) / stage.scaleX()
          const mouseUpY = (pointerPosition.y - stage.y()) / stage.scaleX()

          if (type === EDrawingType.RECT) {
            const [mouseDownX, mouseDownY] = drawPoints
            const rectData = getDrawRectData(mouseDownX, mouseDownY, mouseUpX, mouseUpY)
            const rectResult = { id: _.uniqueId(type), type, data: rectData } as TResult[T]
            onDrawEnd?.(rectResult)
          }
          setDrawPoints([])
          setIsDrawing(false)
        }
      }
    },
    [stageRef, type, drawPoints, onDrawEnd, isDrawing, disabled]
  )
  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current
      stage.on('mousedown touchstart', handleMouseDown)

      stage.on('mousemove touchmove', handleMouseMove)

      stage.on('mouseup touchend', handleMouseUp)

      return () => {
        stage.off('mousedown touchstart', handleMouseDown)

        stage.off('mousemove touchmove', handleMouseMove)

        stage.off('mouseup touchend', handleMouseUp)
      }
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp, stageRef])

  return { drawResult, isDrawing }
}

export * from './types'

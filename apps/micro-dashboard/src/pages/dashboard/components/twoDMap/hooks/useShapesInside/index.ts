import { useCallback, useMemo } from 'react'

import { useStore } from '../../store'

type TFilter = (shape: { x: number; y: number }) => boolean

/**
 * @description: 过滤在画布外面的shape
 * @param {T[]} shapes
 * @param {(originInsideFilter: TFilter => TFilter)} customFilter
 * @return {*}
 */
export function useShapesInside<T extends { x: number; y: number }>(
  shapes: T[],
  generateCustomInsideFilter?: (originInsideFilter: TFilter) => (shape: T) => boolean
) {
  const { stageLeftTopPosition, stageSize, currentScale } = useStore((state) => ({
    stageLeftTopPosition: state.stageLeftTopPosition,
    stageSize: state.stageSize,
    currentScale: state.currentScale
  }))

  const originInsideFilter = useCallback(
    (shape: { x: number; y: number }) => {
      const isOut =
        shape.x < stageLeftTopPosition.x ||
        shape.x > stageLeftTopPosition.x + stageSize.width / currentScale ||
        shape.y < stageLeftTopPosition.y ||
        shape.y > stageLeftTopPosition.y + stageSize.height / currentScale
      return !isOut
    },
    [stageLeftTopPosition, stageSize, currentScale]
  )

  const shapesInside = useMemo(
    () => shapes.filter(generateCustomInsideFilter?.(originInsideFilter) ?? originInsideFilter),
    [shapes, generateCustomInsideFilter, originInsideFilter]
  )

  return shapesInside
}

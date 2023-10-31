import { useMemo } from 'react'

import { useStore } from '../../store'

/**
 * @description: 过滤在画布外面的shape
 * @param {T[]} shapes
 * @return {*}
 */
export function useShapesInside<T extends { x: number; y: number }>(shapes: T[]) {
  const { stageLeftTopPosition, stageSize, currentScale } = useStore((state) => ({
    stageLeftTopPosition: state.stageLeftTopPosition,
    stageSize: state.stageSize,
    currentScale: state.currentScale
  }))

  const shapesInside = useMemo(
    () =>
      shapes.filter((shape) => {
        const isOut =
          shape.x < stageLeftTopPosition.x ||
          shape.x > stageLeftTopPosition.x + stageSize.width / currentScale ||
          shape.y < stageLeftTopPosition.y ||
          shape.y > stageLeftTopPosition.y + stageSize.height / currentScale
        return !isOut
      }),
    [shapes, stageSize, stageLeftTopPosition, currentScale]
  )

  return shapesInside
}

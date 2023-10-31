import _ from 'lodash'
import { useMemo } from 'react'

import { useStore } from '../../store'
import { ILineProps } from '.'

/**
 * @description: 过滤在画布外面的line
 * @param {T[]} lines
 * @return {*}
 */
export function useLinesInside(lines: ILineProps[]) {
  const { stageLeftTopPosition, stageSize, currentScale } = useStore((state) => ({
    stageLeftTopPosition: state.stageLeftTopPosition,
    stageSize: state.stageSize,
    currentScale: state.currentScale
  }))

  const linesInside = useMemo(
    () =>
      lines.filter((line) => {
        const pointsChunk = _.chunk(line.points, 2)
        const isLineInside = pointsChunk.some((point) => {
          const [x, y] = point
          const isOut =
            x < stageLeftTopPosition.x ||
            x > stageLeftTopPosition.x + stageSize.width / currentScale ||
            y < stageLeftTopPosition.y ||
            y > stageLeftTopPosition.y + stageSize.height / currentScale
          return !isOut
        })

        return isLineInside
      }),
    [lines, stageSize, stageLeftTopPosition, currentScale]
  )

  return linesInside
}

import { useMemo } from 'react'

import { useStore } from '../../store'
import { ILineProps } from '.'

export const useLines = (edges: API.Edge[]) => {
  const { idPointMap, stageMapRatio } = useStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    idPointMap: state.idPointMap
  }))
  const lines: ILineProps[] = useMemo(
    () =>
      edges.map((edge) => {
        const startPoint = idPointMap.get(edge.Start)
        const endPoint = idPointMap.get(edge.End)
        const line = {
          text: edge.ID,
          points:
            startPoint && endPoint
              ? [
                  startPoint?.x,
                  startPoint?.y,
                  ...edge.ControlPoint.map((cPoint) => [cPoint.X * stageMapRatio, cPoint.Y * stageMapRatio]),
                  endPoint?.x,
                  endPoint?.y
                ].flat()
              : []
        }
        return line
      }),
    [idPointMap, stageMapRatio, edges]
  )

  return lines
}

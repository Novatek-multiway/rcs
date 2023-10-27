import { useMemo } from 'react'

import { useStore } from '../../store'
import { IPointProps } from '.'

export const usePoints = (vertexes: API.Vertex[]) => {
  const stageMapRatio = useStore((state) => state.stageMapRatio)
  const points: IPointProps[] = useMemo(
    () =>
      vertexes.map((vertex) => ({
        x: vertex.X * stageMapRatio,
        y: vertex.Y * stageMapRatio,
        text: vertex.ID
      })),
    [stageMapRatio, vertexes]
  )

  return points
}

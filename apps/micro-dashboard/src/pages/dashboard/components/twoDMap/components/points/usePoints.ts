import { useMemo } from 'react'

import { useStore } from '../../store'
import { IPointProps } from '.'

export const usePoints = (vertexes: API.Vertex[]) => {
  const { stageMapRatio, setPoint } = useStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    setPoint: state.setPoint
  }))
  const points: IPointProps[] = useMemo(
    () =>
      vertexes.map((vertex) => {
        const point = {
          x: vertex.X * stageMapRatio,
          y: vertex.Y * stageMapRatio,
          text: vertex.ID
        }
        setPoint(vertex.ID, point)
        return point
      }),
    [stageMapRatio, setPoint, vertexes]
  )

  return points
}

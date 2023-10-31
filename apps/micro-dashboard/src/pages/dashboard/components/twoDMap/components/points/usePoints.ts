import { useMemo } from 'react'

import { useStore } from '../../store'

export const usePoints = (vertexes: API.Vertex[]) => {
  const { stageMapRatio, setPoint } = useStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    setPoint: state.setPoint
  }))
  const points = useMemo(
    () =>
      vertexes.map((vertex) => {
        const point = {
          id: vertex.ID,
          x: vertex.X * stageMapRatio,
          y: vertex.Y * stageMapRatio,
          text: vertex.ID,
          type: vertex.Type
        }
        setPoint(vertex.ID, point)
        return point
      }),
    [stageMapRatio, setPoint, vertexes]
  )

  return points
}

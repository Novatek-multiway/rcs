import { useMemo } from 'react'

import { useStore } from '../../store'
import { ILineProps } from '.'

const removeDuplicateLine = (edges: API.Edge[]) => {
  const uniqueArr: API.Edge[] = []
  const set = new Set()
  for (let i = 0; i < edges.length; i++) {
    const { Start, End } = edges[i]
    const key1 = `${Start}-${End}`
    const key2 = `${End}-${Start}`
    if (!set.has(key1) && !set.has(key2)) {
      set.add(key1)
      set.add(key2)
      uniqueArr.push(edges[i])
    }
  }

  return uniqueArr
}

export const useLines = (edges: API.Edge[]) => {
  const { idPointMap, stageMapRatio } = useStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    idPointMap: state.idPointMap
  }))
  const lines: ILineProps[] = useMemo(
    () =>
      removeDuplicateLine(edges).map((edge) => {
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

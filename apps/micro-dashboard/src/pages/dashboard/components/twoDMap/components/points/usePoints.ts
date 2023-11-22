import { useMemo } from 'react'

import { useTwoDMapStore } from '../../store'

export const usePoints = (vertexes: MapAPI.Vertex[]) => {
  const { stageMapRatio, setIdPointMap } = useTwoDMapStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    setIdPointMap: state.setIdPointMap
  }))
  const points = useMemo(() => {
    const newIdPointMap = new Map()
    const points = vertexes.map((vertex) => {
      const point = {
        id: vertex.ID,
        x: vertex.X * stageMapRatio,
        y: -vertex.Y * stageMapRatio,
        text: vertex.ID,
        type: vertex.Type,
        isFull: vertex.LocationState === 1
      }

      newIdPointMap.set(vertex.ID, point)
      return point
    })
    // TODO fix error:  Cannot update a component (`InternalStage`) while rendering a different component (`TwoDMap`) 可能是导致更新鼠标位置时TwoDMap组件重新渲染次数过多，cpu占用提升的原因
    setIdPointMap(newIdPointMap)
    return points
  }, [stageMapRatio, setIdPointMap, vertexes])

  return points
}

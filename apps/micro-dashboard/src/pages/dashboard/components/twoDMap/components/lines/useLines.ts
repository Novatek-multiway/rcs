import { useMemo } from 'react'

import { useTwoDMapStore } from '../../store'
import { ILineDirectionsProps, ILineProps } from '.'

// 边处理：删除重复边、生成方向
const processLine = (edges: MapAPI.Edge[]) => {
  const set = new Set()
  const map = new Map<string, MapAPI.Edge & { CustomDirection?: ILineDirectionsProps['directions'] }>()

  // 生成边的方向
  const _generateCustomDirection = (line: MapAPI.Edge & { CustomDirection?: ILineDirectionsProps['directions'] }) => {
    const leftCenterIndex = (line.ControlPoint.length >> 1) - 1
    const { X, Y } = line.ControlPoint[leftCenterIndex]
    const nextIndex = line.ControlPoint[leftCenterIndex + 1]
    const rad = Math.atan2(nextIndex?.Y - Y, nextIndex?.X - X)
    const deg = (rad * 180) / Math.PI
    const direction: NonNullable<ILineDirectionsProps['directions']>[0] = {
      id: line.ID,
      x: X,
      y: Y,
      angle: deg
    }
    return direction
  }
  for (let i = 0; i < edges.length; i++) {
    const { Start, End } = edges[i]
    const key = `${Start}-${End}`
    const reverseKey = `${End}-${Start}`
    if (!set.has(reverseKey)) {
      set.add(key)
      // 生成非重复边的方向
      const direction = _generateCustomDirection(edges[i])
      map.set(key, { ...edges[i], CustomDirection: [direction] })
    } else {
      const line = map.get(reverseKey)
      if (!line?.ControlPoint.length) continue
      // 生成重复边的方向
      const direction = _generateCustomDirection(edges[i])
      map.set(reverseKey, { ...line, CustomDirection: [...(line.CustomDirection || []), direction] })
    }
  }

  const uniqueArr: (MapAPI.Edge & { CustomDirection?: ILineDirectionsProps['directions'] })[] = [...map.values()]

  return uniqueArr
}

// 采样起点、终点和中间两个控制点作为konva的三次贝塞尔曲线的点（只需要四个点）
// const SEGMENTS = 4
// const sampleControlPoints = (controlPoints: number[][]) => {
//   const result = []
//   const length = controlPoints.length
//   for (let i = 0; i < SEGMENTS; i++) {
//     const index = i === SEGMENTS - 1 ? length - 1 : Math.ceil(length / SEGMENTS) * i
//     result.push(controlPoints[index])
//   }

//   return result.flat()
// }

export const useLines = (edges: MapAPI.Edge[]) => {
  const { setIdLineMap, stageMapRatio } = useTwoDMapStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    idPointMap: state.idPointMap,
    setIdLineMap: state.setIdLineMap
  }))
  const deduplicatedEdges = useMemo(() => processLine(edges), [edges])
  const lines: (ILineProps & ILineDirectionsProps)[] = useMemo(() => {
    const idLineMap = new Map()
    const line = deduplicatedEdges.map((edge) => {
      const directions =
        edge.CustomDirection?.map((d) => ({ ...d, x: d.x * stageMapRatio, y: -d.y * stageMapRatio })) || []
      const controlPoints = edge.ControlPoint.map((cPoint) => [
        cPoint.X * stageMapRatio,
        -cPoint.Y * stageMapRatio
      ]).flat()

      const line = {
        id: edge.ID,
        points: controlPoints,
        bezier: !!edge.ControlPoint.length,
        directions
      }
      // 将重复的两条边都存到映射
      directions.forEach((d) => idLineMap.set(d.id, line))
      return line
    })
    setIdLineMap(idLineMap)
    return line
  }, [stageMapRatio, setIdLineMap, deduplicatedEdges])

  return lines
}

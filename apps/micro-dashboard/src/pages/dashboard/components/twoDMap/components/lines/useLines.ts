import { useMemo } from 'react'

import { useTwoDMapStore } from '../../store'
import { ILineDirectionsProps, ILineProps } from '.'
import { BSpline, SplinePoint } from './spline'

// 边处理：删除反方向边、生成方向
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
      /**
       * A-B 可能会有两条重复的边
       */
      if (!set.has(key)) {
        // key边不存在，生成一条新边
        set.add(key)
        // 生成非反方向边的方向
        const direction = _generateCustomDirection(edges[i])
        map.set(key, { ...edges[i], CustomDirection: [direction] })
      } else {
        // key边存在，合并方向
        const line = map.get(key)
        if (!line?.ControlPoint.length) continue
        // 生成反方向边的方向
        const direction = _generateCustomDirection(edges[i])
        const customDirection = line.CustomDirection || []
        const newLine = { ...line, CustomDirection: [...customDirection, direction] }
        map.set(key, newLine)
      }
    } else {
      const line = map.get(reverseKey)
      if (!line?.ControlPoint.length) continue
      // 生成反方向边的方向
      const direction = _generateCustomDirection(edges[i])
      const customDirection = line.CustomDirection || []
      const newLine = { ...line, CustomDirection: [...customDirection, direction] }
      map.set(reverseKey, newLine)
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

// 获取根据控制点计算的贝塞尔曲线的采样点
const getSplinePoints = (
  edge: Pick<MapAPI.Edge, 'Type' | 'Length' | 'ID' | 'ControlPoint'> & {
    startPoint?: { x: number; y: number }
    endPoint?: { x: number; y: number }
  },
  stageMapRatio: number
) => {
  const result: number[] = []
  // Type: 1-直线，2-曲线，3-圆弧
  if (edge.Type === 1) {
    if (!edge.startPoint || !edge.endPoint) return result
    result.push(edge.startPoint.x, edge.startPoint.y, edge.endPoint.x, edge.endPoint.y)
  } else {
    const t = edge.Length / 20
    const points = edge.ControlPoint.map(function (p) {
      return SplinePoint.CreateSplinePoint(p.X, p.Y)
    })

    const bSpline = new BSpline(points, t)
    if (edge.ID === 5529) {
      console.log(edge, bSpline)
    }
    bSpline.PlotPoints().forEach((point) => {
      result.push(point.X * stageMapRatio, point.Y * stageMapRatio)
    })
  }

  return result
}

export const useLines = (edges: MapAPI.Edge[]) => {
  const { setIdLineMap, stageMapRatio, idPointMap } = useTwoDMapStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    idPointMap: state.idPointMap,
    setIdLineMap: state.setIdLineMap
  }))

  const deduplicatedEdges = useMemo(() => processLine(edges), [edges])

  const lines: (ILineProps & ILineDirectionsProps)[] = useMemo(() => {
    const idLineMap = new Map()
    const line = deduplicatedEdges.map((edge) => {
      const directions =
        edge.CustomDirection?.map((d) => ({ ...d, x: d.x * stageMapRatio, y: d.y * stageMapRatio })) || []
      // const controlPoints = edge.ControlPoint.map((cPoint) => [cPoint.X * stageMapRatio, cPoint.Y * stageMapRatio])

      const line = {
        id: edge.ID,
        points: getSplinePoints(
          {
            Type: edge.Type,
            startPoint: idPointMap.get(edge.Start),
            endPoint: idPointMap.get(edge.End),
            ControlPoint: edge.ControlPoint,
            Length: edge.Length,
            ID: edge.ID
          },
          stageMapRatio
        ),
        bezier: false,
        directions
      }
      // 将重复的两条边都存到映射
      directions.forEach((d) => idLineMap.set(d.id, line))
      return line
    })
    setIdLineMap(idLineMap)
    return line
  }, [stageMapRatio, setIdLineMap, deduplicatedEdges, idPointMap])

  return lines
}

import { useMemo } from 'react'

import { useTwoDMapStore } from '../../store'
import { ILineDirectionsProps, ILineProps } from '.'
import { BSpline, SplinePoint } from './spline'

type TTempDirection = { isOpposite: boolean; id: number }

// 边处理：删除反方向边、生成方向初始值
const deduplicateLines = (edges: MapAPI.Edge[]) => {
  const set = new Set()
  const map = new Map<string, MapAPI.Edge & { tempDirection?: TTempDirection[] }>()

  for (let i = 0; i < edges.length; i++) {
    const { Start, End, ID } = edges[i]

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
        const direction = { isOpposite: false, id: ID }
        map.set(key, { ...edges[i], tempDirection: [direction] })
      } else {
        // key边存在，合并方向
        const line = map.get(key)
        if (!line?.ControlPoint.length) continue
        // 生成反方向边的方向
        const direction = { isOpposite: true, id: ID }
        const tempDirection = line.tempDirection || []
        const newLine = { ...line, tempDirection: [...tempDirection, direction] }
        map.set(key, newLine)
      }
    } else {
      const line = map.get(reverseKey)
      if (!line?.ControlPoint.length) continue
      // 生成反方向边的方向
      const direction = { isOpposite: true, id: ID }
      const tempDirection = line.tempDirection || []
      const newLine = { ...line, tempDirection: [...tempDirection, direction] }
      map.set(reverseKey, newLine)
    }
  }

  const uniqueArr: (MapAPI.Edge & { tempDirection?: TTempDirection[] })[] = [...map.values()]

  return uniqueArr
}

// 获取根据控制点计算的贝塞尔曲线的采样点
const calcSplinePoints = (
  edge: Pick<MapAPI.Edge, 'Type' | 'Length' | 'ID' | 'ControlPoint'> & {
    startPoint?: { x: number; y: number }
    endPoint?: { x: number; y: number }
  }
) => {
  const result: number[] = []
  // Type: 1-直线，2-曲线，3-圆弧
  if (edge.Type === 1) {
    edge.ControlPoint.forEach((cPoint) => {
      result.push(cPoint.X, cPoint.Y)
    })
  } else {
    const t = edge.Length / 20
    const points = edge.ControlPoint.map(function (p) {
      return SplinePoint.CreateSplinePoint(p.X, p.Y)
    })

    const bSpline = new BSpline(points, t)
    bSpline.PlotPoints().forEach((point) => {
      // 控制点需要乘以stageMapRatio（因为startPoint和endPoint是从idMap中获取的，已经乘过了）
      // 由于采样点只能根据原来的值计算出准确的值， 所以只能在这里乘以stageMapRatio
      result.push(point.X, point.Y)
    })
  }

  return result
}

// 计算方向的数据
const calcLinesDirections = (lines: (MapAPI.Edge & { tempDirection?: TTempDirection[]; points: number[] })[]) => {
  return lines.map((line) => {
    const directions = line.tempDirection?.map((d) => {
      const offset = d.isOpposite ? -1 : 1
      const leftCenterIndex = (line.points.length >> 2) - offset
      const x = line.points[leftCenterIndex * 2]
      const y = line.points[leftCenterIndex * 2 + 1]
      const nextIndex = leftCenterIndex + offset
      const nextX = line.points[nextIndex * 2]
      const nextY = line.points[nextIndex * 2 + 1]
      const rad = Math.atan2(nextY - y, nextX - x)
      const deg = (rad * 180) / Math.PI
      const direction: NonNullable<ILineDirectionsProps['directions']>[0] = {
        id: d.id,
        x,
        y,
        angle: deg
      }
      return direction
    })
    return {
      ...line,
      directions
    }
  })
}
export const useLines = (edges: MapAPI.Edge[]) => {
  const { setIdLineMap, stageMapRatio, idPointMap } = useTwoDMapStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    idPointMap: state.idPointMap,
    setIdLineMap: state.setIdLineMap
  }))

  const processedLines = useMemo(() => {
    const copyEdges = [...edges]
    const deduplicatedLines = deduplicateLines(copyEdges)
    const calculatedPointsLines = deduplicatedLines.map((line) => ({
      ...line,
      points: calcSplinePoints({
        Type: line.Type,
        startPoint: idPointMap.get(line.Start),
        endPoint: idPointMap.get(line.End),
        ControlPoint: line.ControlPoint,
        Length: line.Length,
        ID: line.ID
      }).map((point) => point * stageMapRatio)
    }))
    const calculatedLinesDirections = calcLinesDirections(
      calculatedPointsLines.map((line) => ({
        ...line,
        ControlPoint: line.ControlPoint.map((cPoint) => ({
          ...cPoint,
          X: cPoint.X * stageMapRatio,
          Y: cPoint.Y * stageMapRatio
        }))
      }))
    )

    return calculatedLinesDirections
  }, [edges, idPointMap, stageMapRatio])

  const lines: (ILineProps & ILineDirectionsProps)[] = useMemo(() => {
    const idLineMap = new Map()
    const lines = processedLines.map((processedLine) => {
      const directions = processedLine.directions || []
      // const controlPoints = edge.ControlPoint.map((cPoint) => [cPoint.X * stageMapRatio, cPoint.Y * stageMapRatio])

      const line = {
        id: processedLine.ID,
        points: processedLine.points,
        bezier: false,
        directions
      }
      // 将重复的两条边都存到映射
      directions.forEach((d) => idLineMap.set(d.id, line))
      return line
    })
    setIdLineMap(idLineMap)
    return lines
  }, [setIdLineMap, processedLines])

  return lines
}

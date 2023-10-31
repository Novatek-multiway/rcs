import { useMemo } from 'react'

import { useStore } from '../../store'
import { ILineDirectionsProps, ILineProps } from '.'

// 删除方向相反，但是路径相同的边
const removeDuplicateLine = (edges: API.Edge[]) => {
  const set = new Set()
  const map = new Map<string, API.Edge & { CustomDirection?: ILineDirectionsProps['directions'] }>()

  // 生成边的方向
  const _generateCustomDirection = (line: API.Edge & { CustomDirection?: ILineDirectionsProps['directions'] }) => {
    const leftCenterIndex = (line.ControlPoint.length >> 1) - 1
    const { X, Y } = line.ControlPoint[leftCenterIndex]
    const endPoint = line.ControlPoint.at(-1)!
    const rad = Math.atan2(Y - endPoint?.Y, X - endPoint?.X)
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

  const uniqueArr: (API.Edge & { CustomDirection?: ILineDirectionsProps['directions'] })[] = [...map.values()]

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
              : [],
          bezier: !!edge.ControlPoint.length,
          directions: edge.CustomDirection?.map((d) => ({ ...d, x: d.x * stageMapRatio, y: d.y * stageMapRatio }))
        }
        return line
      }),
    [idPointMap, stageMapRatio, edges]
  )

  return lines
}

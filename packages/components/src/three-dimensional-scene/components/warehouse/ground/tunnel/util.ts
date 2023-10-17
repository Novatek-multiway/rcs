import { getCenterPointOfRectEdges } from '../../../../utils/math'

export const getTunnelLinePoints = (width: number, depth: number, tunnelPosition = { x: 0, z: 0 }) => {
  const { x, z } = tunnelPosition
  const [left, right, top, bottom] = getCenterPointOfRectEdges(width, depth, { x, y: z })
  if (width > depth) {
    return [left, right]
  } else {
    return [top, bottom]
  }
}

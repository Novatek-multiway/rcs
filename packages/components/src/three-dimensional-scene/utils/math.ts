export type TPosition = [x: number, y: number]
/**
 * @description: 获取矩形区域四条边的中心点
 * @param {number} rectWidth
 * @param {number} rectHeight
 * @param {*} rectPosition
 * @return {*}
 */
export const getCenterPointOfRectEdges = (
  rectWidth: number,
  rectHeight: number,
  rectPosition = { x: 0, y: 0 }
): [left: TPosition, right: TPosition, top: TPosition, bottom: TPosition] => {
  const halfRectWidth = rectWidth / 2
  const halfRectHeight = rectHeight / 2
  const { x, y } = rectPosition

  const left: TPosition = [x - halfRectWidth, y]
  const right: TPosition = [x + halfRectWidth, y]
  const top: TPosition = [x, y - halfRectHeight]
  const bottom: TPosition = [x, y + halfRectHeight]

  return [left, right, top, bottom]
}

export const getCornerPointOfRectEdges = (
  rectWidth: number,
  rectHeight: number,
  rectPosition = { x: 0, y: 0 }
): [leftTop: TPosition, rightTop: TPosition, leftBottom: TPosition, rightBottom: TPosition] => {
  const halfRectWidth = rectWidth / 2
  const halfRectHeight = rectHeight / 2
  const { x, y } = rectPosition

  const leftTop: TPosition = [x - halfRectWidth, y - halfRectHeight]
  const rightTop: TPosition = [x + halfRectWidth, y - halfRectHeight]
  const leftBottom: TPosition = [x - halfRectWidth, y + halfRectHeight]
  const rightBottom: TPosition = [x + halfRectWidth, y + halfRectHeight]
  return [leftTop, rightTop, leftBottom, rightBottom]
}

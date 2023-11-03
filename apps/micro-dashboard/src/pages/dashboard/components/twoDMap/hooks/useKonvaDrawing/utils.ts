import { TRectResult } from './types'

/**
 * @description: 根据绘制矩形的结果， width、height、x、y
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {*}
 */
export const getDrawRectData = (x1: number, y1: number, x2: number, y2: number): TRectResult => ({
  x: Math.min(x1, x2),
  y: Math.min(y1, y2),
  width: Math.abs(x2 - x1),
  height: Math.abs(y2 - y1)
})

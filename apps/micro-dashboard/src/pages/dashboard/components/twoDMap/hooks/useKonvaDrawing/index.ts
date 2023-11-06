import Konva from 'konva'
import { Node } from 'konva/lib/Node'
import { RefObject } from 'react'

type TRectResult = Pick<Konva.RectConfig, 'x' | 'y' | 'width' | 'height'>

type TPolygonResult = Konva.LineConfig['points']

type TResult = {
  rect: TRectResult
  polygon: TPolygonResult
}

type TKonvaDrawingTypes = keyof TResult

export function useKonvaDrawing<T extends TKonvaDrawingTypes>(
  konvaNodeRef: RefObject<Node>,
  options: {
    type: T
  }
) {
  if (options.type === 'rect') {
    const drawRect: TRectResult = { x: 0, y: 0, width: 0, height: 0 }
    return drawRect as TResult[T]
  } else if (options.type === 'polygon') {
    const drawPolygon: TPolygonResult = []
    return drawPolygon as TResult[T]
  }
  return undefined
}

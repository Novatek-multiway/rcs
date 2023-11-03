import Konva from 'konva'

export type TRectResult = Pick<Konva.RectConfig, 'x' | 'y' | 'width' | 'height'>

export type TPolygonResult = number[]

export enum EDrawingType {
  RECT = 'rect',
  POLYGON = 'polygon'
}

export type TResultWrapper<D> = { id: string; type: TResultKey; data: D }
export type TResult = {
  rect: TResultWrapper<TRectResult>
  polygon: TResultWrapper<TPolygonResult>
}

export type TResultKey = keyof TResult

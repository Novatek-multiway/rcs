import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect } from 'react'
import { Shape } from 'react-konva'

import BezierMaker, { IPoint } from './BezierMaker'

type TBezierMakerConstructorParameters = ConstructorParameters<typeof BezierMaker>
interface IBezierShapeProps {
  id: number
  bezierMakerOptions: TBezierMakerConstructorParameters[1]
  controlPoints: IPoint[]
}
const bezier = new BezierMaker()
const worker = new Worker(new URL('./worker.ts', import.meta.url))
const onWorkerMessage = (event: any) => {
  const { id, bezierArr } = JSON.parse(event.data) as { id: number; bezierArr: IPoint[] }
  bezierMap.set(id, bezierArr)
}
worker.addEventListener('message', onWorkerMessage)
const bezierMap = new Map<number, IPoint[]>()
const BezierShape: FC<PropsWithChildren<IBezierShapeProps>> = (props) => {
  const { id, controlPoints, bezierMakerOptions } = props

  useEffect(() => {
    return () => {
      worker.removeEventListener('message', onWorkerMessage)
    }
  }, [])

  useEffect(() => {
    worker.postMessage(
      JSON.stringify({
        id,
        controlPoints
      })
    )
  }, [controlPoints, id])

  return (
    <Shape
      sceneFunc={(context) => {
        bezier.setContext(context)
        bezierMakerOptions && bezier.setOptions(bezierMakerOptions)
        const controlPoints = bezierMap.get(id) || []
        bezier.drawBezier(controlPoints)
      }}
    />
  )
}

export default memo(BezierShape)

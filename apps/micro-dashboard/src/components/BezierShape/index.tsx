import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { Shape } from 'react-konva'

import BezierMaker from './BezierMaker'

type TBezierMakerConstructorParameters = ConstructorParameters<typeof BezierMaker>
interface IBezierShapeProps {
  controlPoints: TBezierMakerConstructorParameters[1]
  id: TBezierMakerConstructorParameters[2]
  bezierMakerOptions: TBezierMakerConstructorParameters[3]
}

const BezierShape: FC<PropsWithChildren<IBezierShapeProps>> = (props) => {
  const { id, controlPoints, bezierMakerOptions } = props
  return (
    <Shape
      sceneFunc={(context) => {
        const bezier = new BezierMaker(context, controlPoints, id, bezierMakerOptions)
        bezier.drawBezier()
      }}
    />
  )
}

export default memo(BezierShape)

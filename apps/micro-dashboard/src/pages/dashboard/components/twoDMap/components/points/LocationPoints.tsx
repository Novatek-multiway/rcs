import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { Rect } from 'react-konva'

import ImagePoints from './ImagePoints'

interface ILocationPointProps {
  id: number
  x: number
  y: number
  isFull?: boolean
}

const LOCATION_SIZE = 2.5
const LocationPoint: FC<PropsWithChildren<ILocationPointProps>> = memo((props) => {
  const { id, x, y, isFull = false } = props
  return isFull ? (
    <ImagePoints points={[{ id, x, y, pointImageName: 'package' }]} />
  ) : (
    <Rect
      x={x}
      y={y}
      offsetX={LOCATION_SIZE / 2}
      offsetY={LOCATION_SIZE / 2}
      width={LOCATION_SIZE}
      height={LOCATION_SIZE}
      fill="rgba(47.5, 48, 62.5, 0.8)"
      stroke="rgb(76, 75, 79)"
      strokeWidth={0.35}
    />
  )
})

interface ILocationPointsProps {
  points: ILocationPointProps[]
}

const LocationPoints: FC<PropsWithChildren<ILocationPointsProps>> = (props) => {
  const { points } = props
  return points.map((point) => <LocationPoint key={point.id} {...point} />)
}

export default memo(LocationPoints)

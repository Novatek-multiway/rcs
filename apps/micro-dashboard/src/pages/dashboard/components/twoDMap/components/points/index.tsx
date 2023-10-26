import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { Circle, Group } from 'react-konva'

interface IPointsProps {}

const Points: FC<PropsWithChildren<IPointsProps>> = () => {
  return (
    <Group>
      <Circle width={10} height={10} fill="red" x={400} y={400} />
    </Group>
  )
}

export default memo(Points)

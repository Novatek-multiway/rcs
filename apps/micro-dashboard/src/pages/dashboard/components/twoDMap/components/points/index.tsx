import type { ElementRef, FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Circle, Group, Text } from 'react-konva'
import { theme } from 'theme'

export interface IPointProps {
  x: number
  y: number
  text: string | number
}
const PointTextFontSize = 1
const PointSize = 1
const Point: FC<IPointProps> = memo((props) => {
  const { x, y, text } = props
  const textRef = useRef<ElementRef<typeof Text>>(null)
  const [textWidth, setTextWidth] = useState(0)
  useEffect(() => {
    setTextWidth(textRef.current?.width() || 0)
  }, [textRef])

  return (
    <Group x={x} y={y}>
      <Text
        ref={textRef}
        perfectDrawEnabled={false}
        listening={false}
        text={text + ''}
        fontSize={PointTextFontSize}
        fill={theme.palette.primary.main}
        offsetY={(PointTextFontSize * 3) / 2}
        offsetX={textWidth / 2}
      />

      <Circle perfectDrawEnabled={false} listening={false} width={PointSize} height={PointSize} fill="white" />
    </Group>
  )
})

export interface IPointsProps {
  points: IPointProps[]
}

const Points: FC<PropsWithChildren<IPointsProps>> = (props) => {
  const { points } = props
  return points.map((point) => <Point key={point.text} {...point} />)
}

export default memo(Points)

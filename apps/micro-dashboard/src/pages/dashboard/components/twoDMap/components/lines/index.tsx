import Konva from 'konva'
import type { ElementRef, FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Group, Line as KonvaLine, RegularPolygon, Text } from 'react-konva'

import { getDirectionFromAngle } from '../../utils'

export interface ILineProps extends Konva.LineConfig {
  text: string | number
}
const LINE_TEXT_FONT_SIZE = 0.5 // 边的字体大小
const LINE_SIZE = 0.1 // 边的尺寸
const DIRECTION_REGULAR_POLYGON_SIZE = 0.2 // 边方向的尺寸
// 单个边
const Line: FC<ILineProps> = memo((props) => {
  const { bezier, points = [], strokeWidth } = props

  return (
    <KonvaLine
      perfectDrawEnabled={false}
      listening={false}
      stroke={'#393c44'}
      strokeWidth={strokeWidth || LINE_SIZE}
      bezier={bezier}
      points={points}
    />
  )
})

export interface ILineDirectionsProps {
  directions: { angle: number; id: number; x: number; y: number }[]
}
// 边方向
export const LineDirections: FC<ILineDirectionsProps> = (props) => {
  const { directions = [] } = props

  const textRef = useRef<ElementRef<typeof Text>>(null)
  const [textWidth, setTextWidth] = useState(0)
  useEffect(() => {
    setTextWidth(textRef.current?.width() || 0)
  }, [textRef])
  return directions.map((direction) => {
    const directionValue = getDirectionFromAngle(direction.angle)
    let offsetY = 0
    let offsetX = 0
    if (directionValue === 'left') {
      offsetX = textWidth / 2
      offsetY = LINE_TEXT_FONT_SIZE * 1.5
    } else if (directionValue === 'right') {
      offsetX = textWidth / 2
      offsetY = -LINE_TEXT_FONT_SIZE * 0.8
    } else if (directionValue === 'top') {
      offsetY = LINE_TEXT_FONT_SIZE / 2
      offsetX = -textWidth * 0.2
    } else {
      offsetY = LINE_TEXT_FONT_SIZE / 2
      offsetX = textWidth * 1.2
    }
    return (
      <Group key={direction.id} x={direction.x} y={direction.y}>
        <RegularPolygon
          perfectDrawEnabled={false}
          listening={false}
          sides={3}
          radius={DIRECTION_REGULAR_POLYGON_SIZE}
          fill="rgb(120, 121, 127)"
          rotation={direction.angle + 90}
          scaleY={1.5}
        />
        <Text
          ref={textRef}
          perfectDrawEnabled={false}
          listening={false}
          text={direction.id + ''}
          fontSize={LINE_TEXT_FONT_SIZE}
          fill={'#fff'}
          offsetY={offsetY}
          offsetX={offsetX}
          letterSpacing={0.01}
        />
      </Group>
    )
  })
}

export interface ILinesProps {
  lines: ILineProps[]
  strokeWidth?: number
}

// 所有边
const Lines: FC<PropsWithChildren<ILinesProps>> = (props) => {
  const { lines, strokeWidth } = props
  return lines.map((line) => (
    <Group key={line.text}>
      <Line {...line} strokeWidth={strokeWidth} />
    </Group>
  ))
}

export default memo(Lines)

import Konva from 'konva'
import type { ElementRef, FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Group, Line as KonvaLine, Text } from 'react-konva'
import { theme } from 'theme'

export interface ILineProps extends Konva.LineConfig {
  text: string | number
}
const LineTextFontSize = 1
const LineSize = 1
const Line: FC<ILineProps> = memo((props) => {
  const { text, bezier, points } = props
  const textRef = useRef<ElementRef<typeof Text>>(null)
  const [textWidth, setTextWidth] = useState(0)
  useEffect(() => {
    setTextWidth(textRef.current?.width() || 0)
  }, [textRef])

  return (
    <Group>
      <Text
        ref={textRef}
        perfectDrawEnabled={false}
        listening={false}
        text={text + ''}
        fontSize={LineTextFontSize}
        fill={theme.palette.primary.main}
        offsetY={(LineTextFontSize * 3) / 2}
        offsetX={textWidth / 2}
      />

      <KonvaLine
        perfectDrawEnabled={false}
        listening={false}
        stroke={'#393c44'}
        strokeWidth={LineSize}
        bezier={bezier}
        points={points}
      />
    </Group>
  )
})

export interface ILinesProps {
  lines: ILineProps[]
}

const Lines: FC<PropsWithChildren<ILinesProps>> = (props) => {
  const { lines } = props
  return lines.map((line) => <Line key={line.text} {...line} />)
}

export default memo(Lines)

import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { Image as KonvaImage } from 'react-konva'

import { useImage } from '../../hooks/useImage'

const getPointImage = async (imageName: string) => {
  const imageModule = await import(`../../../../../../assets/points/${imageName}.png`)
  return imageModule.default
}

export interface IImagePointProps {
  id: number
  x: number
  y: number
  pointImageName: string
  imageSize?: number
}

const IMAGE_SIZE = 2.5
const ImagePoint: FC<IImagePointProps> = memo((props) => {
  const { x, y, pointImageName, imageSize = IMAGE_SIZE } = props
  const [pointImagePath, setPointImagePath] = useState<string>('')
  const image = useImage(pointImagePath)
  useEffect(() => {
    const setImageExternal = async () => {
      const pointImagePath = await getPointImage(pointImageName)
      setPointImagePath(pointImagePath)
    }
    setImageExternal()
  }, [pointImageName])

  return (
    <KonvaImage
      x={x}
      y={y}
      image={image}
      width={imageSize}
      height={imageSize}
      offsetX={imageSize / 2}
      offsetY={imageSize / 2}
    ></KonvaImage>
  )
})

interface IImagePointsProps {
  points: IImagePointProps[]
  imageSize?: number
}

const ImagePoints: FC<PropsWithChildren<IImagePointsProps>> = (props) => {
  const { points, imageSize } = props
  return points.map((points) => <ImagePoint key={points.id} imageSize={imageSize} {...points} />)
}

export default memo(ImagePoints)

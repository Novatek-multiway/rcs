import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { Image as KonvaImage } from 'react-konva'

const POINT_IMAGE_MAP: Record<string, HTMLImageElement> = {}
const getPointImage = async (imageName: string) => {
  const imageModule = await import(`../../../../../../assets/points/${imageName}.png`)
  return imageModule.default
}
console.log('🚀 ~ file: ImagePoints.tsx ~ line 10 ~ POINT_IMAGE_MAP', POINT_IMAGE_MAP)

export interface IImagePointProps {
  id: number
  x: number
  y: number
  pointImageName: string
}

const IMAGE_SIZE = 5
const ImagePoint: FC<IImagePointProps> = memo((props) => {
  const { x, y, pointImageName } = props
  const [image, setImage] = useState<HTMLImageElement>()
  useEffect(() => {
    const setImageExternal = async () => {
      if (POINT_IMAGE_MAP[pointImageName]) {
        setImage(POINT_IMAGE_MAP[pointImageName])
      } else {
        const imagePath = await getPointImage(pointImageName)
        const image = new Image()
        POINT_IMAGE_MAP[pointImageName] = image
        image.src = import.meta.env.VITE_APP_HOST + imagePath
        image.onload = () => {
          setImage(image)
        }
      }
    }
    setImageExternal()
  }, [pointImageName])

  return (
    <KonvaImage
      x={x}
      y={y}
      image={image}
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      offsetX={IMAGE_SIZE / 2}
      offsetY={IMAGE_SIZE / 2}
    ></KonvaImage>
  )
})

interface IImagePointsProps {
  points: IImagePointProps[]
}

const ImagePoints: FC<PropsWithChildren<IImagePointsProps>> = (props) => {
  const { points } = props
  return points.map((points) => <ImagePoint key={points.id} {...points} />)
}

export default memo(ImagePoints)

import { useEffect, useState } from 'react'

const POINT_IMAGE_MAP: Record<string, HTMLImageElement> = {}
/**
 * @description: 使用图片，供Konva Image使用
 * @param {string} path 路径
 * @return {*}
 */
export function useImage(path: string) {
  const [image, setImage] = useState<HTMLImageElement>()
  useEffect(() => {
    const setImageExternal = async () => {
      if (!path) return
      if (POINT_IMAGE_MAP[path]) {
        setImage(POINT_IMAGE_MAP[path])
      } else {
        const image = new Image()
        POINT_IMAGE_MAP[path] = image
        image.src = import.meta.env.VITE_APP_HOST + path
        image.onload = () => {
          setImage(image)
        }
      }
    }
    setImageExternal()
  }, [path])

  return image
}

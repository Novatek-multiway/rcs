import { type ElementRef, useCallback, useEffect, useState } from 'react'
import { Stage } from 'react-konva'

const scaleBy = 1.05
export function useZoom(stageRef: React.RefObject<ElementRef<typeof Stage>>) {
  const [currentScale, setCurrentScale] = useState(2)
  /**
   * @description: 根据target的位置进行缩放
   * @param {*} useCallback
   * @return {*}
   */
  const handleZoom = useCallback(
    (
      newScale: number,
      options?: {
        targetPosition?: { x: number; y: number }
        center?: boolean
      }
    ) => {
      const stage = stageRef.current
      if (!stage) return
      const { targetPosition, center = true } = options || {}
      const oldScale = stage.scaleX()
      let position = { x: 0, y: 0 }
      if (targetPosition) {
        position = targetPosition
      } else if (center) {
        position.x = stage.width() / 2
        position.y = stage.height() / 2
      }

      const mousePointTo = {
        x: (position.x - stage.x()) / oldScale,
        y: (position.y - stage.y()) / oldScale
      }
      stage.scale({ x: newScale, y: newScale })

      const newPos = {
        x: position.x - mousePointTo.x * newScale,
        y: position.y - mousePointTo.y * newScale
      }
      stage.position(newPos)

      setCurrentScale(newScale)
    },
    [stageRef]
  )
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const handleWheel = (e: any) => {
      // stop default scrolling
      e.evt.preventDefault()

      const pointer = stage.getPointerPosition()!
      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? 1 : -1

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction
      }
      const oldScale = stage.scaleX()

      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

      handleZoom(newScale, {
        targetPosition: pointer
      })
    }
    stage.on('wheel', handleWheel)

    return () => {
      stage.off('wheel', handleWheel)
    }
  }, [stageRef, handleZoom])
  return {
    currentScale,
    zoom: handleZoom
  }
}

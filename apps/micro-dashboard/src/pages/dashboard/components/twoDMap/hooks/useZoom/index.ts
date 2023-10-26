import { type ElementRef, useEffect, useState } from 'react'
import { Stage } from 'react-konva'

const scaleBy = 1.01
export function useZoom(stageRef: React.RefObject<ElementRef<typeof Stage>>) {
  const [currentScale, setCurrentScale] = useState(1)
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    stage.on('wheel', (e) => {
      // stop default scrolling
      e.evt.preventDefault()

      const oldScale = stage.scaleX()
      const pointer = stage.getPointerPosition()!

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
      }

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? 1 : -1

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction
      }

      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

      // stage.scale({ x: newScale, y: newScale })

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      }
      stage.position(newPos)

      setCurrentScale(newScale)
    })
  }, [stageRef])
  return {
    currentScale
  }
}

import { useEffect, useState } from 'react'

const defaultStep = 6.5
export default function useScaleLevel(currentScale: number, step?: number) {
  const [currentScaleLevel, setCurrentScaleLevel] = useState(1)

  useEffect(() => {
    setCurrentScaleLevel(Math.ceil(currentScale / (step || defaultStep)))
  }, [currentScale, step])

  return {
    scaleLevel: currentScaleLevel
  }
}

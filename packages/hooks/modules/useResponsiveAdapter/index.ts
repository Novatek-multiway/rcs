import { useSize, useUpdateEffect } from 'ahooks'
import autofit from 'autofit.js'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * @description 处理使用autofit的情况下，mui的menu、select等组件位置计算会出错问题
 * @param el
 * @param manual
 * @returns
 */
export default function useResponsiveAdapter(el = 'body', manual = false) {
  const [isAutoFitted, setIsAutoFitted] = useState(false)
  const oldGetBoundingClientRect = useRef(Element.prototype.getBoundingClientRect)
  const adaptFn = useCallback((scaleValue: number) => {
    Element.prototype.getBoundingClientRect = function () {
      const { x, y, width, height, top, right, bottom, left, toJSON } = oldGetBoundingClientRect.current.call(this)
      return {
        x: x / scaleValue,
        y: y / scaleValue,
        width: width / scaleValue,
        height: height / scaleValue,
        top: top / scaleValue,
        right: right / scaleValue,
        bottom: bottom / scaleValue,
        left: left / scaleValue,
        toJSON
      }
    }
  }, [])

  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    if (isAutoFitted || manual) return
    autofit.init({
      dh: 960,
      dw: 1920,
      el,
      resize: true
    })
    const body = document.querySelector('body')
    const transformValue = body?.style.getPropertyValue('transform') || ''
    const match = transformValue.match(/(\d+(\.\d+)?)/)
    if (match) {
      const scaleValue = parseFloat(match[0])
      adaptFn(scaleValue)
      setIsAutoFitted(true)
    }
    isFirstRender && setIsFirstRender(false)
  }, [])

  const size = useSize(document.querySelector('body'))
  useUpdateEffect(() => {
    if (isFirstRender || manual) return
    const body = document.querySelector('body')
    const transformValue = body?.style.getPropertyValue('transform') || ''
    const match = transformValue.match(/(\d+(\.\d+)?)/)
    if (match) {
      const scaleValue = parseFloat(match[0])
      adaptFn(scaleValue)
    }
  }, [size, isAutoFitted])

  return {
    isAutoFitted
  }
}

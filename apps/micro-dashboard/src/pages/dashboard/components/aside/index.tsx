import { useSpring } from '@react-spring/web'
import { useSize } from 'ahooks'
import type { ElementRef, PropsWithChildren, ReactNode } from 'react'
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { AsideLeftWrapper, AsideRightWrapper } from './style'

export interface IAsideProps {
  left: ReactNode
  right: ReactNode
  onSizeChange?: (size: ReturnType<typeof useSize>) => void
}

const Aside = forwardRef<
  {
    asideWidth?: number
    asideOpen: boolean
    toggleAside: () => void
  },
  PropsWithChildren<IAsideProps>
>((props, ref) => {
  const { left, right, onSizeChange } = props
  const [open, setOpen] = useState(true)
  const [asideLeftSprings, asideLeftApi] = useSpring(() => ({
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0%)', opacity: 1 }
  }))
  const [asideRightSprings, asideRightApi] = useSpring(() => ({
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { transform: 'translateX(0%)', opacity: 1 }
  }))

  const toggleAside = () => {
    asideLeftApi.start({
      to: { transform: `translateX(${!open ? 0 : -100}%)`, opacity: open ? 0 : 1 }
    })
    asideRightApi.start({
      to: { transform: `translateX(${!open ? 0 : 100}%)`, opacity: open ? 0 : 1 }
    })
    setOpen((open) => !open)
  }

  const asideRef = useRef<ElementRef<typeof AsideLeftWrapper>>(null)
  const size = useSize(asideRef)

  useEffect(() => {
    onSizeChange?.(size)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  useImperativeHandle(ref, () => ({
    toggleAside,
    asideWidth: size?.width,
    asideOpen: open
  }))
  return (
    <>
      <AsideLeftWrapper ref={asideRef} style={asideLeftSprings}>
        {left}
      </AsideLeftWrapper>
      <AsideRightWrapper style={asideRightSprings}>{right}</AsideRightWrapper>
    </>
  )
})

export default memo(Aside)

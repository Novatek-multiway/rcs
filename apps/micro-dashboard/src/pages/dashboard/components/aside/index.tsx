import { useSpring } from '@react-spring/web'
import type { PropsWithChildren, ReactNode } from 'react'
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'

import { AsideLeftWrapper, AsideRightWrapper } from './style'

interface IAsideProps {
  left: ReactNode
  right: ReactNode
}

const Aside = forwardRef<
  {
    toggleAside: () => void
  },
  PropsWithChildren<IAsideProps>
>((props, ref) => {
  const { left, right } = props
  const [open, setOpen] = useState(true)
  const [asideLeftSprings, asideLeftApi] = useSpring(() => ({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0%)' }
  }))
  const [asideRightSprings, asideRightApi] = useSpring(() => ({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0%)' }
  }))

  const toggleAside = () => {
    asideLeftApi.start({
      to: { transform: `translateX(${!open ? 0 : -100}%)` }
    })
    asideRightApi.start({
      to: { transform: `translateX(${!open ? 0 : 100}%)` }
    })
    setOpen((open) => !open)
  }

  useImperativeHandle(ref, () => ({
    toggleAside
  }))
  return (
    <>
      <AsideLeftWrapper style={asideLeftSprings}>{left}</AsideLeftWrapper>
      <AsideRightWrapper style={asideRightSprings}>{right}</AsideRightWrapper>
    </>
  )
})

export default memo(Aside)

import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Configuration: FC<IProps> = () => {
  return <Outlet></Outlet>
}

export default memo(Configuration)

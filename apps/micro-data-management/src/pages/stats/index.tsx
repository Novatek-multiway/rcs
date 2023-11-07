import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

// 统计
const Stats: FC<IProps> = () => {
  return <Outlet></Outlet>
}

export default memo(Stats)

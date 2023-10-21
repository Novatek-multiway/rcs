import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 站点配置
const Point: FC<IProps> = () => {
  return <div>Point</div>
}

export default memo(Point)

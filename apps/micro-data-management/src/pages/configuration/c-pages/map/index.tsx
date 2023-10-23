import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 地图配置
const Map: FC<IProps> = () => {
  return <div>Map</div>
}

export default memo(Map)

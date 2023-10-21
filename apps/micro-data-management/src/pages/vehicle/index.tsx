import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 车辆管理
const Vehicle: FC<IProps> = () => {
  return <div>Vehicle</div>
}

export default memo(Vehicle)

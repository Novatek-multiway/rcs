import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  return <div>VehicleType</div>
}

export default memo(VehicleType)

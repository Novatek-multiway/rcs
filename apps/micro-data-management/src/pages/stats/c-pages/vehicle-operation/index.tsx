import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

const VehicleOperation: FC<IProps> = () => {
  return <div>VehicleOperation</div>
}

export default memo(VehicleOperation)

import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

interface IVehicleStatusProps {}

// 车辆状态
const VehicleStatus: FC<PropsWithChildren<IVehicleStatusProps>> = () => {
  return <div>VehicleStatus</div>
}

export default memo(VehicleStatus)

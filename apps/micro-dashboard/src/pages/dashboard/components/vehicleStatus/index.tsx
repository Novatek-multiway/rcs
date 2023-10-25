import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import Panel from 'ui/src/panel'

import VehicleStatusItem from './components/vehicleStatusItem'
import { VehicleStatusWrapper } from './style'

interface IVehicleStatusProps {}

enum EVehicleStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  FREE = 'free',
  ERROR = 'error'
}

const data = [
  {
    key: EVehicleStatus.ONLINE,
    name: '在线',
    value: 0
  },
  {
    key: EVehicleStatus.OFFLINE,
    name: '离线',
    value: 16
  },
  {
    key: EVehicleStatus.FREE,
    name: '空闲',
    value: 0
  },
  {
    key: EVehicleStatus.ERROR,
    name: '异常',
    value: 0
  }
]
const ColorMap: Record<EVehicleStatus, string> = {
  [EVehicleStatus.ONLINE]: '#00c6c7',
  [EVehicleStatus.OFFLINE]: '#757575',
  [EVehicleStatus.FREE]: '#ffffff',
  [EVehicleStatus.ERROR]: '#f00'
}

// 车辆状态
const VehicleStatus: FC<PropsWithChildren<IVehicleStatusProps>> = () => {
  return (
    <Panel
      title="车辆状态"
      wrapperStyle={{
        height: '28.5%'
      }}
    >
      <VehicleStatusWrapper>
        {data.map((d) => (
          <VehicleStatusItem key={d.key} text={d.name} value={d.value} color={ColorMap[d.key]} />
        ))}
      </VehicleStatusWrapper>
    </Panel>
  )
}

export default memo(VehicleStatus)

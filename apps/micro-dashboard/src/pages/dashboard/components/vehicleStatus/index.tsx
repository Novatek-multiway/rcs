import { useAsyncEffect } from 'ahooks'
import { getAgvStatus } from 'apis'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useState } from 'react'
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

const ColorMap: Record<EVehicleStatus, string> = {
  [EVehicleStatus.ONLINE]: '#00c6c7',
  [EVehicleStatus.OFFLINE]: '#757575',
  [EVehicleStatus.FREE]: '#ffffff',
  [EVehicleStatus.ERROR]: '#f00'
}

// 车辆状态
const VehicleStatus: FC<PropsWithChildren<IVehicleStatusProps>> = () => {
  const [vehicleStatusData, setVehicleStatusData] = useState<ReportAPI.CarrierStatus>()
  const vehicleStatusList = useMemo(
    () => [
      {
        key: EVehicleStatus.ONLINE,
        name: '在线',
        value: vehicleStatusData?.onlineCount || 0
      },
      {
        key: EVehicleStatus.OFFLINE,
        name: '离线',
        value: vehicleStatusData?.offlineCount || 0
      },
      {
        key: EVehicleStatus.FREE,
        name: '空闲',
        value: vehicleStatusData?.freeCount || 0
      },
      {
        key: EVehicleStatus.ERROR,
        name: '异常',
        value: vehicleStatusData?.abnormalCount || 0
      }
    ],
    [vehicleStatusData]
  )

  useAsyncEffect(async () => {
    const res = await getAgvStatus()
    const vehicleStatusData = res.data as ReportAPI.CarrierStatus
    setVehicleStatusData(vehicleStatusData)
  }, [])

  return (
    <Panel
      title="车辆状态"
      wrapperStyle={{
        height: '28.5%'
      }}
    >
      <VehicleStatusWrapper>
        {vehicleStatusList.map((d) => (
          <VehicleStatusItem key={d.key} text={d.name} value={d.value} color={ColorMap[d.key]} />
        ))}
      </VehicleStatusWrapper>
    </Panel>
  )
}

export default memo(VehicleStatus)

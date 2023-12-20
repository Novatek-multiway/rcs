import { useVoerkaI18n } from '@voerkai18n/react'
import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getAgvStatus } from 'apis'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useState } from 'react'
import Panel from 'ui/src/panel'

import { useWebsocketStore } from '../../store/websocket'
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
  const wsVehicleStatusData = useWebsocketStore((state) => state['Report/GetAgvStatus'])
  const { t } = useVoerkaI18n()
  const [vehicleStatusData, setVehicleStatusData] = useState<ReportAPI.CarrierStatus>()
  const vehicleStatusList = useMemo(
    () => [
      {
        key: EVehicleStatus.ONLINE,
        name: t('在线'),
        value: vehicleStatusData?.onlineCount || 0
      },
      {
        key: EVehicleStatus.OFFLINE,
        name: t('离线'),
        value: vehicleStatusData?.offlineCount || 0
      },
      {
        key: EVehicleStatus.FREE,
        name: t('空闲'),
        value: vehicleStatusData?.freeCount || 0
      },
      {
        key: EVehicleStatus.ERROR,
        name: t('异常'),
        value: vehicleStatusData?.abnormalCount || 0
      }
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicleStatusData]
  )

  useAsyncEffect(async () => {
    const res = await getAgvStatus()
    const vehicleStatusData = res.data as ReportAPI.CarrierStatus
    setVehicleStatusData(vehicleStatusData)
  }, [])

  useUpdateEffect(() => {
    wsVehicleStatusData && setVehicleStatusData(wsVehicleStatusData)
  }, [wsVehicleStatusData])

  return (
    <Panel
      title={t('车辆状态')}
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

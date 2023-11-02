import { useMemo } from 'react'

import { EVehicleLightImageName } from '../../constants'
import { useTwoDMapStore } from '../../store'
import { IVehiclesProps } from '.'

// 获取当前显示的light的图片名称
const getVehicleLightImageName = (carrier: ReportAPI.OnlineCarrier) => {
  const { controlState, plannings, statusName } = carrier
  if (controlState === 1 || controlState === 3) {
    // 表示手动或半自动
    return EVehicleLightImageName.WHITE
  } else if (plannings.some((planning) => planning.state1 === 2)) {
    // plannings列表中存在State1 = 2 代表线路被交管
    return EVehicleLightImageName.YELLOW
  } else if (statusName === '异常') {
    return EVehicleLightImageName.RED
  }
  return EVehicleLightImageName.BLUE
}

export const useVehicles = (carriers: ReportAPI.OnlineCarrier[]) => {
  const { stageMapRatio, idLineMap } = useTwoDMapStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    idLineMap: state.idLineMap
  }))
  const vehicles = useMemo<IVehiclesProps['vehicles']>(
    () =>
      carriers.map((carrier) => {
        const lines = carrier.plannings
          .filter((planning) => planning.planningType === 2)
          .filter((p) => idLineMap.has(p.planningKey))
          .map((p) => idLineMap.get(p.planningKey)!)
        const vehicle = {
          id: carrier.id,
          x: carrier.x * stageMapRatio,
          y: carrier.y * stageMapRatio,
          vehicleImageName: carrier.image.replace('.png', ''),
          vehicleLightImageName: getVehicleLightImageName(carrier),
          lines: lines,
          statusName: carrier.statusName,
          battery: carrier.elecQuantity
        }
        return vehicle
      }),
    [stageMapRatio, carriers, idLineMap]
  )

  return vehicles
}

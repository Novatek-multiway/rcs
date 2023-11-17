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

export const useVehicles = (
  carriers: ReportAPI.OnlineCarrier[],
  options?: {
    carrierPlanningFilter: (planning: ReportAPI.Planning) => boolean
  }
) => {
  const { stageMapRatio, idLineMap } = useTwoDMapStore((state) => ({
    stageMapRatio: state.stageMapRatio,
    idLineMap: state.idLineMap
  }))
  const { carrierPlanningFilter } = options ?? {}
  const vehicles = useMemo<IVehiclesProps['vehicles']>(
    () =>
      carriers.map((carrier) => {
        const lines = carrier.plannings
          .filter((planning) => {
            const planningTypeCondition = planning.planningType === 2 // 只需要渲染计划类型为2的路线
            const stateCondition = planning.state1 !== 5 // 已路过的路线不显示
            const lineExistCondition = idLineMap.has(planning.planningKey) // 当前路线存在
            const customCondition = carrierPlanningFilter ? carrierPlanningFilter(planning) : true // 自定义过滤
            return planningTypeCondition && stateCondition && lineExistCondition && customCondition
          })
          .map((p) => idLineMap.get(p.planningKey)!)
        const isFull = carrier.goodsStatus === 1
        const vehicleImageName = carrier.image.replace('.png', isFull ? '.FULL' : '')
        const vehicle = {
          id: carrier.id,
          x: carrier.x * stageMapRatio,
          y: carrier.y * stageMapRatio,
          vehicleImageName,
          vehicleLightImageName: getVehicleLightImageName(carrier),
          lines: lines,
          statusName: carrier.statusName,
          battery: carrier.elecQuantity,
          angle: carrier.angle
        }
        return vehicle
      }),
    [stageMapRatio, carriers, idLineMap, carrierPlanningFilter]
  )

  return vehicles
}

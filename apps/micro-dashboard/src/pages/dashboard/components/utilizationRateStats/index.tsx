import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

interface IUtilizationRateStatsProps {}

// 稼动率统计
const UtilizationRateStats: FC<PropsWithChildren<IUtilizationRateStatsProps>> = () => {
  return <div>UtilizationRateStats</div>
}

export default memo(UtilizationRateStats)

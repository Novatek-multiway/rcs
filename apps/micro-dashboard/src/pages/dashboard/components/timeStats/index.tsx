import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { Panel } from 'ui'

interface ITimeStatsProps {}

// 车辆时间统计
const TimeStats: FC<PropsWithChildren<ITimeStatsProps>> = () => {
  return (
    <Panel
      title="车辆时间统计"
      wrapperStyle={{
        height: '400px'
      }}
    >
      TimeStats
    </Panel>
  )
}

export default memo(TimeStats)

import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

interface ITaskStatsProps {}

// 车辆任务统计
const TaskStats: FC<PropsWithChildren<ITaskStatsProps>> = () => {
  return <div>TaskStats</div>
}

export default memo(TaskStats)

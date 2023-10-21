import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 任务管理
const Assignment: FC<IProps> = () => {
  return <div>Assignment</div>
}

export default memo(Assignment)

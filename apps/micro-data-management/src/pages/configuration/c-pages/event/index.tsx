import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 事件配置
const Event: FC<IProps> = () => {
  return <div>Event</div>
}

export default memo(Event)

import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 待命点配置
const StandByPoint: FC<IProps> = () => {
  return <div>StandByPoint</div>
}

export default memo(StandByPoint)

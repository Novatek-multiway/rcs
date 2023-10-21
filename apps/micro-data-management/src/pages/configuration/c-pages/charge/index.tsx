import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 充电配置
const Charge: FC<IProps> = () => {
  return <div>Charge</div>
}

export default memo(Charge)

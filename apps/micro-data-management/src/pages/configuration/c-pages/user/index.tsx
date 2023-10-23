import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

interface IProps {
  children?: ReactNode
}

// 用户配置
const User: FC<IProps> = () => {
  return <div>User</div>
}

export default memo(User)

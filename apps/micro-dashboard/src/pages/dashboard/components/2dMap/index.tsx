import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import { TwoDMapWrapper } from './style'

interface ITwoDMapProps {}

// 2D地图
const TwoDMap: FC<PropsWithChildren<ITwoDMapProps>> = () => {
  return <TwoDMapWrapper>TwoDMap</TwoDMapWrapper>
}

export default memo(TwoDMap)

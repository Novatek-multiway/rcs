import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { SvgIcon } from 'ui'

import { useStore } from '../../store'
import { MeasuringScaleWrapper } from './style'

interface IMeasuringScaleProps {}

const MEASURING_SCALE_SIZE = 50 // 比例尺的尺寸

const MeasuringScale: FC<PropsWithChildren<IMeasuringScaleProps>> = () => {
  const { currentScale, stageMapRatio } = useStore((state) => ({
    currentScale: state.currentScale,
    stageMapRatio: state.stageMapRatio
  }))
  return (
    <MeasuringScaleWrapper>
      <SvgIcon sx={{ width: MEASURING_SCALE_SIZE + 'px', height: MEASURING_SCALE_SIZE + 'px' }} color="primary">
        <svg
          viewBox="0 0 3198 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4666"
          width="100"
          height="100"
          fill="currentColor"
        >
          <path
            d="M3092.076038 1024H106.787438A106.787438 106.787438 0 0 1 0 917.212562v-549.192539a106.787438 106.787438 0 0 1 213.574876 0v442.405101h2771.713724v-442.405101a106.787438 106.787438 0 1 1 213.574877 0v549.192539a106.787438 106.787438 0 0 1-106.787439 106.787438z"
            p-id="4667"
          ></path>
        </svg>
      </SvgIcon>
      <span>{(MEASURING_SCALE_SIZE / stageMapRatio / currentScale).toFixed(2)}</span>
    </MeasuringScaleWrapper>
  )
}

export default memo(MeasuringScale)

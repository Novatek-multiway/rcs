import React, { memo, PropsWithChildren } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import InternalStage, { IInternalStageProps } from './InternalStage'

const AutoResizerStage = (props: PropsWithChildren<Omit<IInternalStageProps, 'height' | 'width'>>) => (
  <AutoSizer defaultWidth={window.innerWidth} defaultHeight={window.innerHeight}>
    {({ height, width }) => {
      return width && height && <InternalStage width={width} height={height} {...props} />
    }}
  </AutoSizer>
)

export default memo(AutoResizerStage)

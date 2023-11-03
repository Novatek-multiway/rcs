import React, { memo, PropsWithChildren } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import InternalStage from './InternalStage'

const AutoResizerStage = (props: PropsWithChildren) => (
  <AutoSizer defaultWidth={window.innerWidth} defaultHeight={window.innerHeight}>
    {({ height, width }) => {
      return (
        width &&
        height && (
          <InternalStage width={width} height={height}>
            {props.children}
          </InternalStage>
        )
      )
    }}
  </AutoSizer>
)

export default memo(AutoResizerStage)

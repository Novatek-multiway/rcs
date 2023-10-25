import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import { PanelBackdrop, PanelContentWrapper, PanelWrapper } from './style'

interface IPanelProps {
  title?: string
  wrapperStyle?: React.CSSProperties
}

const Panel: FC<PropsWithChildren<IPanelProps>> = (props) => {
  const { title = 'panel', wrapperStyle } = props
  return (
    <PanelWrapper style={wrapperStyle}>
      {title && <div className="panel-title">{title}</div>}
      <PanelContentWrapper>
        <PanelBackdrop />
        {props.children}
      </PanelContentWrapper>
    </PanelWrapper>
  )
}

export default memo(Panel)

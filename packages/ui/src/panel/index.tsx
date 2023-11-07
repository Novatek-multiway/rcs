import { Typography } from '@mui/material'
import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import { PanelBackdrop, PanelContentWrapper, PanelWrapper } from './style'

interface IPanelProps {
  title?: string
  wrapperStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
}

const Panel: FC<PropsWithChildren<IPanelProps>> = (props) => {
  const { title = 'panel', wrapperStyle, contentStyle } = props
  return (
    <PanelWrapper style={wrapperStyle}>
      {title && (
        <Typography variant="caption" className="panel-title">
          {title}
        </Typography>
      )}
      <PanelContentWrapper>
        <PanelBackdrop />
        <div className="panel-content" style={contentStyle}>
          {props.children}
        </div>
      </PanelContentWrapper>
    </PanelWrapper>
  )
}

export default memo(Panel)

import { ThemeProvider } from '@mui/material/styles'
import type { FC } from 'react'
import React, { memo } from 'react'
import { theme } from 'theme'

import backgroundImage from './assets/background-mask.png'
import { Content } from './components/content'
import { Header } from './components/header'
import { LayoutWrapper } from './style'
import { ILayoutProps } from './types'

const Layout: FC<ILayoutProps> = (props) => {
  const { customBackgroundImage, routes } = props
  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper backgroundImage={customBackgroundImage || backgroundImage}>
        <Header />
        <Content routes={routes} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default memo(Layout)

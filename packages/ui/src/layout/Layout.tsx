import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Collapse, CssBaseline, Toolbar, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { FC } from 'react'
import React, { memo, useState } from 'react'
import { theme } from 'theme'

import logo from './assets/logo.png'
import Nav, { INavProps } from './Nav'
import Settings, { ISettingsProps } from './Settings'
import Time, { ITimeProps } from './Time'

export interface LayoutProps {
  systemName: string
  children: React.ReactNode
  navProps: INavProps
  settingsProps?: ISettingsProps
  timeProps?: ITimeProps
  onLogoTitleClick?: () => void
}

const Layout: FC<LayoutProps> = (props) => {
  const { systemName = '', navProps, settingsProps, timeProps, onLogoTitleClick } = props
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          overflow: 'auto',
          flexDirection: 'column',
          userSelect: 'none'
        }}
      >
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            background: 'rgb(24, 26, 33)',
            color: theme.palette.text.primary,
            zIndex: 1000
          }}
        >
          <Toolbar variant="dense" sx={{ alignItems: 'center' }}>
            <img src={logo} alt="logo" height={28} onClick={onLogoTitleClick} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                marginLeft: '6px',
                transform: 'translateY(2px)'
              }}
              onClick={onLogoTitleClick}
            >
              {systemName}
            </Typography>
            <MenuIcon
              fontSize="medium"
              onClick={() => setCollapsed((collapsed) => !collapsed)}
              sx={{ cursor: 'pointer', marginLeft: 'auto' }}
            />
            <Collapse in={!collapsed} orientation="horizontal">
              <Box
                sx={{
                  '&.MuiBox-root': {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    whiteSpace: 'nowrap'
                  }
                }}
              >
                <Nav {...navProps} />
              </Box>
            </Collapse>
            <Time {...timeProps} />
            <Settings {...settingsProps} />
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 0, mt: theme.spacing(6), flex: 1, minHeight: 0 }}>
          {props?.children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
export default memo(Layout)

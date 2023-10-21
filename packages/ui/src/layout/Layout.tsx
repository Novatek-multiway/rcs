import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Collapse, CssBaseline, Toolbar, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { FC } from 'react'
import React, { memo, useState } from 'react'
import { theme } from 'theme'

import logo from './assets/logo.png'
import Nav from './Nav'
import Time from './Time'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', userSelect: 'none' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ background: 'rgb(24, 26, 33)', color: theme.palette.text.primary }}>
          <Toolbar variant="dense" sx={{ alignItems: 'center' }}>
            <img src={logo} alt="logo" height={28} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                marginLeft: '6px',
                transform: 'translateY(2px)'
              }}
            >
              调度监控系统
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
                <Nav />
              </Box>
            </Collapse>
            <Time />
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3, mt: theme.spacing(6), flex: 1 }}>
          {props?.children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
export default memo(Layout)

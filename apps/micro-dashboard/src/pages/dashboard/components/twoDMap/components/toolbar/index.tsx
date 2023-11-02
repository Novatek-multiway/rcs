import { Add, Remove, Search, Settings as SettingsIcon } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { Button, createTheme, ThemeProvider } from 'ui'

import { useDashboardStore } from '@/pages/dashboard/store'

import { useStore } from '../../store'
import Settings from './components/settings'
import { ToolbarWrapper } from './style'

interface IToolbarProps {
  toolbarRight?: number
}

const Toolbar: FC<PropsWithChildren<IToolbarProps>> = (props) => {
  const { toolbarRight } = props
  const { currentScale, setCurrentScale } = useStore((state) => ({
    currentScale: state.currentScale,
    setCurrentScale: state.setCurrentScale
  }))
  const { setAsideOpen } = useDashboardStore((state) => ({
    setAsideOpen: state.setAsideOpen
  }))
  const toolbarSprings = useSpring({
    right: toolbarRight
  })

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const handleSettingsClick = useCallback(() => {
    if (isSettingsOpen) {
      setAsideOpen(true)
      setIsSettingsOpen(false)
    } else {
      setAsideOpen(false)
      setIsSettingsOpen(true)
    }
  }, [setAsideOpen, isSettingsOpen])

  const handleSettingsClose = useCallback(() => {
    setIsSettingsOpen(false)
    setAsideOpen(true)
  }, [setAsideOpen])

  return (
    <ToolbarWrapper style={toolbarSprings}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: '#a4a5a7'
            }
          }
        })}
      >
        <Button variant="contained" sx={{ minWidth: 'auto' }} onClick={() => setCurrentScale(currentScale + 0.1)}>
          <Add color="info" />
        </Button>
        <Button variant="contained" sx={{ minWidth: 'auto' }} onClick={() => setCurrentScale(currentScale - 0.1)}>
          <Remove color="info" />
        </Button>
        <Button variant="contained" sx={{ minWidth: 'auto' }}>
          <Search color="info" />
        </Button>
        <Button variant="contained" sx={{ minWidth: 'auto' }} onClick={handleSettingsClick}>
          <SettingsIcon color="info" />
        </Button>
      </ThemeProvider>
      <Settings open={isSettingsOpen} onClose={handleSettingsClose} />
    </ToolbarWrapper>
  )
}

export default memo(Toolbar)

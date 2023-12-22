import { Add, Remove, Search, Settings as SettingsIcon } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { createTheme, SpeedDial, SpeedDialAction, SpeedDialIcon, ThemeProvider } from 'ui'

import { useDashboardStore } from '@/pages/dashboard/store'

import { useTwoDMapStore } from '../../store'
import Settings from './components/settings'
import { ToolbarWrapper } from './style'

interface IToolbarProps {
  toolbarRight?: number
}

const Toolbar: FC<PropsWithChildren<IToolbarProps>> = (props) => {
  const { toolbarRight } = props
  const { currentScale, zoom, setSearchAreaVisible } = useTwoDMapStore((state) => ({
    currentScale: state.currentScale,
    zoom: state.zoom,
    setSearchAreaVisible: state.setSearchAreaVisible
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

  const handleSearchClick = useCallback(() => {
    setSearchAreaVisible(true)
  }, [setSearchAreaVisible])

  const actions = useMemo(
    () => [
      { icon: <SettingsIcon />, name: '设置', onClick: handleSettingsClick },
      { icon: <Search />, name: '搜索', onClick: handleSearchClick }, // TODO 搜索功能实现
      { icon: <Remove />, name: '缩小', onClick: () => zoom?.(currentScale - 1) },
      { icon: <Add />, name: '放大', onClick: () => zoom?.(currentScale + 1) }
    ],
    [handleSettingsClick, zoom, currentScale, handleSearchClick]
  )

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
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
              color="info"
            />
          ))}
        </SpeedDial>
      </ThemeProvider>
      <Settings open={isSettingsOpen} onClose={handleSettingsClose} />
    </ToolbarWrapper>
  )
}

export default memo(Toolbar)

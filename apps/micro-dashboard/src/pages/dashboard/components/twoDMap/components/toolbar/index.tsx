import { Add, Remove, Search } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { Button, createTheme, ThemeProvider } from 'ui'

import { useStore } from '../../store'
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
  const toolbarSprings = useSpring({
    right: toolbarRight
  })

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
      </ThemeProvider>
    </ToolbarWrapper>
  )
}

export default memo(Toolbar)

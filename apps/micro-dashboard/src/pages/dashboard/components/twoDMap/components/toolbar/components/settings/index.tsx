import { Close } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import { useUpdateEffect } from 'ahooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { theme } from 'theme'
import { Button, Panel, Switch } from 'ui'

import { Lights, Switches } from './constant'
import { SettingsWrapper } from './style'

interface ISettingsProps {
  open?: boolean
  onClose?: () => void
}

const Settings: FC<PropsWithChildren<ISettingsProps>> = (props) => {
  const { open = false, onClose } = props
  const [isSettingsOpen, setIsSettingsOpen] = useState(open)
  const [settingsSpring, settingsApi] = useSpring(() => ({ transform: 'translateY(100%)', opacity: 0 }))

  const handleClose = useCallback(() => {
    setIsSettingsOpen(false)
    onClose?.()
  }, [onClose])

  useUpdateEffect(() => {
    setIsSettingsOpen(open)
  }, [open])

  useUpdateEffect(() => {
    settingsApi.start({
      to: { transform: `translateY(${isSettingsOpen ? 0 : 100}%)`, opacity: !isSettingsOpen ? 0 : 1 }
    })
  }, [isSettingsOpen])
  return (
    <SettingsWrapper style={settingsSpring}>
      <Panel title="">
        <div className="header">
          <Button variant="text" sx={{ minWidth: 'auto' }} disableRipple onClick={handleClose} size="small">
            <Close />
          </Button>
        </div>
        <div className="settings-content">
          <div className="switches">
            {Switches.map((switchItem) => (
              <div>
                <Switch
                  key={switchItem.label}
                  inputProps={{ 'aria-label': switchItem.label }}
                  sx={{
                    '&.MuiSwitch-root': {
                      height: '32px',
                      width: '46px',
                      padding: '3px 0px'
                    },
                    '.MuiButtonBase-root': {
                      padding: '3px',
                      top: '3px'
                    },
                    '.MuiSwitch-track': {
                      borderRadius: '4px',
                      backgroundColor: '#1a1d24',
                      opacity: 1,
                      border: '1px solid #757575'
                    },
                    '.MuiSwitch-thumb ': {
                      borderRadius: '4px',
                      backgroundColor: '#606062'
                    },
                    '.Mui-checked': {
                      '& + .MuiSwitch-track': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: '#0d1116 !important'
                      },
                      '.MuiSwitch-thumb ': {
                        backgroundColor: theme.palette.primary.main
                      }
                    }
                  }}
                />
                <span>{switchItem.label}</span>
              </div>
            ))}
          </div>
          <div className="lines">
            <div className="item">
              <span className="label">地图路线</span>
              <span
                className="marker"
                style={{
                  backgroundColor: '#393c44'
                }}
              ></span>
            </div>
            <div className="item">
              <span className="label">规划路线</span>
              <span
                className="marker"
                style={{
                  backgroundColor: '#00b4ce'
                }}
              ></span>
            </div>
            <div>
              <Button variant="text" size="small">
                绘制区块
              </Button>
            </div>
          </div>
          <div className="lights">
            {Lights.map((light) => {
              return (
                <div className="item" key={light.label}>
                  <span>{light.label}</span>
                  <img src={light.image} />
                </div>
              )
            })}
          </div>
        </div>
      </Panel>
    </SettingsWrapper>
  )
}

export default memo(Settings)
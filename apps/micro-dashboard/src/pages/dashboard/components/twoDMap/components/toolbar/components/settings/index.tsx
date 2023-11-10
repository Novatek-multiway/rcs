import { Close } from '@mui/icons-material'
import { useSpring } from '@react-spring/web'
import { useUpdateEffect } from 'ahooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { theme } from 'theme'
import { Button, Panel, Switch } from 'ui'

import { EMapSettingsKeys, EStageMode } from '../../../../constants'
import { TTwoDMapState, useTwoDMapStore } from '../../../../store'
import { Lights, Switches } from './constant'
import LineColorPicker from './LineColorPicker'
import { SettingsWrapper } from './style'

interface ISettingsProps {
  open?: boolean
  onClose?: () => void
}

const Settings: FC<PropsWithChildren<ISettingsProps>> = (props) => {
  const { open = false, onClose } = props
  const {
    settings,
    setSettings,
    setIsDrawingBlockCardOpen,
    setStageMode,
    settingSwitches,
    setSettingSwitches,
    setCurrentChangedSwitch
  } = useTwoDMapStore((state) => ({
    settings: state.settings,
    setSettings: state.setSettings,
    setIsDrawingBlockCardOpen: state.setIsDrawingBlockCardOpen,
    setStageMode: state.setStageMode,
    settingSwitches: state.settingSwitches,
    setSettingSwitches: state.setSettingSwitches,
    setCurrentChangedSwitch: state.setCurrentChangedSwitch
  }))

  const [isSettingsOpen, setIsSettingsOpen] = useState(open)
  const [settingsSpring, settingsApi] = useSpring(() => ({ transform: 'translateY(100%)', opacity: 0 }))

  const handleClose = useCallback(() => {
    setIsSettingsOpen(false)
    setIsDrawingBlockCardOpen(false)
    onClose?.()
  }, [onClose, setIsDrawingBlockCardOpen])

  useUpdateEffect(() => {
    setIsSettingsOpen(open)
  }, [open])

  useUpdateEffect(() => {
    settingsApi.start({
      to: { transform: `translateY(${isSettingsOpen ? 0 : 100}%)`, opacity: !isSettingsOpen ? 0 : 1 }
    })
  }, [isSettingsOpen])

  const switchStyle = useMemo(
    () => ({
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
    }),
    []
  )

  const handleSwitchValueChange = useCallback(
    (checked: boolean, switchKey: (typeof Switches)[0]['key']) => {
      setSettings({
        [switchKey]: checked
      })
      const newSettingSwitches = [...settingSwitches]
      const findSwitch = settingSwitches.find((switchItem) => switchItem.key === switchKey) || null
      if (findSwitch) {
        findSwitch.enabled = checked
        setSettingSwitches(newSettingSwitches)
      }
      setCurrentChangedSwitch(findSwitch)
    },
    [setSettings, settingSwitches, setSettingSwitches, setCurrentChangedSwitch]
  )

  useEffect(() => {
    return () => {
      handleClose()
    }
  }, [handleClose])
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
            {settingSwitches
              .sort((a, b) => a.sort - b.sort)
              .filter((d) => d.showed)
              .map((switchItem) => (
                <div key={switchItem.label}>
                  <Switch
                    inputProps={{ 'aria-label': switchItem.label }}
                    sx={switchStyle}
                    checked={
                      (settings as Omit<TTwoDMapState['settings'], 'lineColor' | 'planningLineColor'>)[
                        switchItem.key as Exclude<EMapSettingsKeys, 'lineColor' | 'planningLineColor'>
                      ]
                    }
                    onChange={(_, checked) => handleSwitchValueChange(checked, switchItem.key)}
                  />
                  <span>{switchItem.label}</span>
                </div>
              ))}
          </div>
          <div className="lines">
            {/* TODO 颜色更新本地缓存 */}
            <LineColorPicker
              label="地图路线"
              initialColor={settings.lineColor}
              onChange={(color) => setSettings({ lineColor: color })}
            />
            <LineColorPicker
              label="规划路线"
              initialColor={settings.planningLineColor}
              onChange={(color) => setSettings({ planningLineColor: color })}
            />
            <div>
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setIsDrawingBlockCardOpen(true)
                  setStageMode(EStageMode.DRAW)
                }}
              >
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

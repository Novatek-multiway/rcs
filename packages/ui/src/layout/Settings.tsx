import { CloseOutlined } from '@mui/icons-material'
import SettingIcon from '@mui/icons-material/Settings'
import { Box, Divider, Drawer, ToggleButton, ToggleButtonGroup, ToggleButtonProps } from '@mui/material'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import React, { memo, useMemo, useState } from 'react'

interface ISettingItemProps {
  title: string
  options: { label: string; value: any; icon?: ReactNode }[]
  toggleButtonProps?: Omit<ToggleButtonProps, 'value'>
  defaultValue?: any
  onChange?: (newValue: any) => void
  renderContent?: () => ReactNode
}
const SettingItem: FC<ISettingItemProps> = (props) => {
  const { title, options, defaultValue, onChange, renderContent, toggleButtonProps } = props
  const [value, setValue] = useState(defaultValue)

  return (
    <>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#dce3ee', lineHeight: 2.5 }}>{title}</div>
      {renderContent ? (
        renderContent()
      ) : (
        <ToggleButtonGroup
          sx={{
            width: '100%'
          }}
          color="primary"
          size="small"
          value={value}
          onChange={(e) => {
            const value = (e as any).target.value
            setValue(value)
            onChange?.(value)
          }}
        >
          {options.map((button) => (
            <ToggleButton key={button.value} {...toggleButtonProps} value={button.value}>
              {button.icon}
              {button.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </>
  )
}

type TSettingKeys = 'language'
enum ESupportedLanguages {
  zh = 'zh',
  en = 'en',
  jp = 'jp',
  kor = 'kor'
}
const SettingTitleMessages: Record<string, Record<ESupportedLanguages, string>> = {
  language: {
    [ESupportedLanguages.zh]: '语言',
    [ESupportedLanguages.en]: 'Language',
    [ESupportedLanguages.jp]: '言語',
    [ESupportedLanguages.kor]: '언어'
  },
  setting: {
    [ESupportedLanguages.zh]: '设置',
    [ESupportedLanguages.en]: 'Setting',
    [ESupportedLanguages.jp]: '設定',
    [ESupportedLanguages.kor]: '설정'
  }
}
export interface ISettingsProps {
  defaultSettingsValue?: Record<TSettingKeys, any>
  onSettingChange?: (key: TSettingKeys, newValue: any) => void
}

const Settings: FC<PropsWithChildren<ISettingsProps>> = (props) => {
  const { onSettingChange, defaultSettingsValue } = props
  const [currentLanguage, setCurrentLanguage] = useState<ESupportedLanguages>(defaultSettingsValue?.language || 'zh')
  const toggleSettings = useMemo<ISettingItemProps[]>(
    () => [
      {
        title: SettingTitleMessages['language'][currentLanguage],
        options: [
          {
            label: '中文',
            value: 'zh'
          },
          {
            label: 'English',
            value: 'en'
          },
          {
            label: '日本語',
            value: 'jp'
          },
          {
            label: '한국어',
            value: 'kor'
          }
        ],
        defaultValue: defaultSettingsValue ? defaultSettingsValue['language'] : 'zh',
        onChange: (newValue) => {
          onSettingChange?.('language', newValue)
          setCurrentLanguage(newValue)
        },
        toggleButtonProps: {
          sx: {
            minWidth: '25%'
          }
        }
      }
    ],
    [currentLanguage]
  )
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false)
  return (
    <div>
      <SettingIcon fontSize="medium" sx={{ cursor: 'pointer' }} onClick={() => setIsSettingsDrawerOpen(true)} />
      {isSettingsDrawerOpen && (
        <Drawer
          anchor="right"
          open={isSettingsDrawerOpen}
          onClose={() => {
            setIsSettingsDrawerOpen(false)
          }}
          sx={{
            '& .MuiDrawer-paper': {
              borderRadius: '10px 0 0 10px',
              width: '400px'
            }
          }}
          keepMounted
          variant="persistent"
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              width: '100%',
              lineHeight: '2'
            }}
          >
            <span>{SettingTitleMessages['setting'][currentLanguage]}</span>
            <CloseOutlined sx={{ cursor: 'pointer' }} onClick={() => setIsSettingsDrawerOpen(false)} />
          </Box>
          <Divider />
          {toggleSettings.map((setting) => (
            <Box
              sx={{
                padding: '16px',
                width: '100%',
                lineHeight: '2'
              }}
            >
              <SettingItem {...setting} />
            </Box>
          ))}
        </Drawer>
      )}
    </div>
  )
}

export default memo(Settings)

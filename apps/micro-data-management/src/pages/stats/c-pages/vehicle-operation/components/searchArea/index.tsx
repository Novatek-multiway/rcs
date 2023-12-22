import { useVoerkaI18n } from '@voerkai18n/react'
import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { postGetControlOptions } from 'apis'
import dayjs from 'dayjs'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useState } from 'react'
import { AdapterDayjs, Button, DatePicker, LocalizationProvider, MenuItem, TextField, zhCN } from 'ui'

import { SearchAreaWrapper } from './style'

export interface ISearchAreaProps {
  formData: {
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    carrierID: any
  }
  onChange?: (newFormData: ISearchAreaProps['formData']) => void
  onSearch?: () => void
}

const SearchArea: FC<PropsWithChildren<ISearchAreaProps>> = (props) => {
  const { formData, onChange, onSearch } = props
  const { t, activeLanguage } = useVoerkaI18n()

  const [carrierOptions, setCarrierOptions] = useState<{ label: string; value: number | string }[]>([])

  useAsyncEffect(async () => {
    const res = await postGetControlOptions({})
    const carrierOptions = [{ label: t('全部'), value: t('全部') }].concat(
      res.data.map((item: any) => ({
        label: item.id + '',
        value: item.id
      }))
    )
    setCarrierOptions(carrierOptions)
  }, [])

  useUpdateEffect(() => {
    setCarrierOptions((prev) => {
      return [{ label: t('全部'), value: t('全部') as string | number }].concat(prev.slice(1))
    })
  }, [activeLanguage])

  return (
    <SearchAreaWrapper>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={zhCN.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <DatePicker
          views={['year', 'month', 'day']}
          format="YYYY/MM/DD"
          slotProps={{
            field: {
              clearable: true
            },
            textField: {
              size: 'small',
              label: t('开始时间')
            }
          }}
          value={formData.startDate}
          onChange={(date) => {
            onChange?.({
              ...formData,
              startDate: date
            })
          }}
        />

        <DatePicker
          views={['year', 'month', 'day']}
          format="YYYY/MM/DD"
          slotProps={{
            field: {
              clearable: true
            },
            textField: {
              size: 'small',
              label: t('结束时间')
            }
          }}
          value={formData.endDate}
          onChange={(date) => {
            onChange?.({
              ...formData,
              endDate: date
            })
          }}
        />
      </LocalizationProvider>
      <TextField
        select
        label={t('车辆编号')}
        size="small"
        sx={{ minWidth: 120 }}
        value={'10'}
        SelectProps={{
          value: formData.carrierID,
          onChange: (e) => {
            onChange?.({
              ...formData,
              carrierID: e.target.value
            })
          }
        }}
      >
        {carrierOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="outlined"
        sx={{
          marginLeft: 'auto'
        }}
        size="small"
        onClick={onSearch}
      >
        {t('搜索')}
      </Button>
    </SearchAreaWrapper>
  )
}

export default memo(SearchArea)

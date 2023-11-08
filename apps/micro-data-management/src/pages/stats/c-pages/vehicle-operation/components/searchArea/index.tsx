import dayjs from 'dayjs'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { AdapterDayjs, Button, DatePicker, LocalizationProvider, MenuItem, TextField, zhCN } from 'ui'

import { SearchAreaWrapper } from './style'

interface ISearchAreaProps {}

const SearchArea: FC<PropsWithChildren<ISearchAreaProps>> = () => {
  const [searchFormData, setSearchFormData] = useState<{
    startDate: dayjs.Dayjs | null
    endDate: dayjs.Dayjs | null
    vehicleId: any
  }>({
    startDate: dayjs().startOf('month'),
    endDate: dayjs().endOf('month'),
    vehicleId: '全部'
  })
  const handleSearchClick = useCallback(() => {
    console.log(searchFormData)
  }, [searchFormData])
  return (
    <SearchAreaWrapper>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={zhCN.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <DatePicker
          views={['year', 'month', 'day']}
          format="YYYY/MM/DD HH:mm:ss"
          slotProps={{
            field: {
              clearable: true
            },
            textField: {
              size: 'small',
              label: '开始时间'
            }
          }}
          value={searchFormData.startDate}
          onChange={(date) => {
            setSearchFormData({
              ...searchFormData,
              startDate: date
            })
          }}
        />
        <DatePicker
          views={['year', 'month', 'day']}
          format="YYYY/MM/DD HH:mm:ss"
          slotProps={{
            field: {
              clearable: true
            },
            textField: {
              size: 'small',
              label: '结束时间'
            }
          }}
          value={searchFormData.endDate}
          onChange={(date) => {
            setSearchFormData({
              ...searchFormData,
              endDate: date
            })
          }}
        />
      </LocalizationProvider>
      <TextField
        select
        label="车辆编号"
        size="small"
        sx={{ minWidth: 120 }}
        value={'10'}
        SelectProps={{
          value: searchFormData.vehicleId,
          onChange: (e) => {
            setSearchFormData({
              ...searchFormData,
              vehicleId: e.target.value
            })
          }
        }}
      >
        <MenuItem value={'全部'}>全部</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
      </TextField>
      <Button
        variant="outlined"
        sx={{
          marginLeft: 'auto'
        }}
        size="small"
        onClick={handleSearchClick}
      >
        搜索
      </Button>
    </SearchAreaWrapper>
  )
}

export default memo(SearchArea)

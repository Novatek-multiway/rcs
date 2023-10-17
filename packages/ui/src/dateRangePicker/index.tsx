import { Box, BoxProps } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { zhCN } from 'date-fns/locale'
import dayjs from 'dayjs'
import { DateRangePicker } from 'mui-daterange-picker'
import * as React from 'react'

import { getDefaultRanges } from './defaultRanges'
interface IProps {
  open: boolean
  setOpen: () => void
  callback?: (rangeDate: any) => void
  boxSx?: BoxProps
}
const DateRangePickerComponent = (props: IProps) => {
  const { open, setOpen, callback, boxSx } = props

  const theme = createTheme({
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            minWidth: '100px'
          }
        }
      }
    }
  })

  const handleDateChange = (newDateRange: any) => {
    callback && callback(newDateRange)
  }

  return (
    <Box {...boxSx}>
      <ThemeProvider theme={theme}>
        <DateRangePicker
          open={open}
          toggle={setOpen}
          onChange={handleDateChange}
          definedRanges={getDefaultRanges(new Date(), zhCN)}
          locale={zhCN}
        />
      </ThemeProvider>
    </Box>
  )
}

export default DateRangePickerComponent

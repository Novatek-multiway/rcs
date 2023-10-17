import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateRange } from '@mui/x-date-pickers-pro'
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker'
import dayjs, { Dayjs } from 'dayjs'
import * as React from 'react'
import { FC } from 'react'

interface IProp {
  defaultValue: DateRange<Dayjs> | string[]
  changeFn?: (value: DateRange<Dayjs>) => void
}

const MuiDateRange: FC<IProp> = (props) => {
  const { defaultValue = [dayjs().subtract(7, 'days').startOf('day'), dayjs().endOf('day')], changeFn } = props

  const [dateRange, setDateRange] = React.useState<DateRange<Dayjs> | null>(null)

  React.useEffect(() => {
    // 兼容处理 defaultValue 为字符串数组的情况
    if (Array.isArray(defaultValue)) {
      const startDate = dayjs(defaultValue[0])
      const endDate = dayjs(defaultValue[1])
      setDateRange([startDate, endDate])
    } else {
      setDateRange(defaultValue)
    }
  }, [defaultValue])

  const handleDateChange = (newDateRange: DateRange<Dayjs>) => {
    if (newDateRange.length === 2) {
      setDateRange(newDateRange)
      changeFn?.(newDateRange)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateRangePicker value={dateRange ?? undefined} onChange={handleDateChange} />
    </LocalizationProvider>
  )
}

export default MuiDateRange

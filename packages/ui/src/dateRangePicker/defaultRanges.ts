import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns'

// eslint-disable-next-line no-unused-vars
import { DefinedRange } from './type'

export const getDefaultRanges = (date: Date, locale?: Locale): DefinedRange[] => [
  {
    label: '今天',
    startDate: date,
    endDate: date
  },
  {
    label: '昨天',
    startDate: addDays(date, -1),
    endDate: addDays(date, -1)
  },
  {
    label: '本周',
    startDate: startOfWeek(date, { locale }),
    endDate: endOfWeek(date, { locale })
  },
  {
    label: '上周',
    startDate: startOfWeek(addWeeks(date, -1), { locale }),
    endDate: endOfWeek(addWeeks(date, -1), { locale })
  },
  {
    label: '历史7天',
    startDate: addWeeks(date, -1),
    endDate: date
  },
  {
    label: '本月',
    startDate: startOfMonth(date),
    endDate: endOfMonth(date)
  },
  {
    label: '上个月',
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1))
  },
  {
    label: '今年',
    startDate: startOfYear(date),
    endDate: endOfYear(date)
  },
  {
    label: '去年',
    startDate: startOfYear(addYears(date, -1)),
    endDate: endOfYear(addYears(date, -1))
  }
]

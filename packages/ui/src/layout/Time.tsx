import { styled } from '@mui/material'
import type { FC } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { formatDate, getTimeGreeting } from 'utils'

const getAllTimeInfo = () => {
  const date = new Date()
  const timeStamp = date.getTime()
  const timeGreeting = getTimeGreeting(date.getHours()) // 招呼语
  const hms = formatDate(timeStamp, 'HH:mm:ss') // 时分秒
  const ymd = formatDate(timeStamp, 'YYYY-MM-DD') // 年月日
  const week = formatDate(timeStamp, 'dddd') // 星期

  return {
    timeGreeting,
    hms,
    ymd,
    week
  }
}
const initialTimeInfo = getAllTimeInfo()

const TimeWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginLeft: '24px',
  whiteSpace: 'nowrap',
  '.greeting': {
    fontSize: '16px'
  },
  '.time': {
    fontSize: '16px'
  },
  '.date': {
    fontSize: '14px'
  },
  '.week': {
    fontSize: '14px'
  }
}))

const Time: FC = () => {
  const [timeGreeting, setTimeGreeting] = useState(initialTimeInfo.timeGreeting)
  const [time, setTime] = useState(initialTimeInfo.hms)
  const [date, setDate] = useState(initialTimeInfo.ymd)
  const [week, setWeek] = useState(initialTimeInfo.week)
  useEffect(() => {
    const timer = setInterval(() => {
      const { timeGreeting, hms, ymd, week } = getAllTimeInfo()
      setTimeGreeting(timeGreeting)
      setTime(hms)
      setDate(ymd)
      setWeek(week)
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  return (
    <TimeWrapper>
      <div className="greeting">{timeGreeting}</div>
      <div className="time">{time}</div>
      <div>
        <div className="date">{date}</div>
        <div className="week">{week}</div>
      </div>
    </TimeWrapper>
  )
}

export default memo(Time)

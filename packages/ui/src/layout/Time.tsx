import { styled } from '@mui/material'
import type { FC } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { formatDate, getTimeGreeting, TTimeGreetings } from 'utils'

const getAllTimeInfo = (customTimeGreeting?: TTimeGreetings) => {
  const date = new Date()
  const timeStamp = date.getTime()
  const timeGreeting = getTimeGreeting(date.getHours(), customTimeGreeting) // 招呼语
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

const TimeWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: '0 24px',
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

export interface ITimeProps {
  customTimeGreeting?: TTimeGreetings
}
const Time: FC<ITimeProps> = (props) => {
  const { customTimeGreeting } = props
  const [timeGreeting, setTimeGreeting] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  // const [week, setWeek] = useState(initialTimeInfo.week)
  useEffect(() => {
    const timer = setInterval(() => {
      const {
        timeGreeting,
        hms,
        ymd
        // week
      } = getAllTimeInfo(customTimeGreeting)
      setTimeGreeting(timeGreeting)
      setTime(hms)
      setDate(ymd)
      // setWeek(week)
    }, 1000)

    return () => clearInterval(timer)
  }, [customTimeGreeting])
  return (
    <TimeWrapper>
      <div className="greeting">{timeGreeting}</div>
      <div className="time">
        {date} - {time}
      </div>
      <div>
        {/* <div className="date">{date}</div> */}
        {/* <div className="week">{week}</div> */}
      </div>
    </TimeWrapper>
  )
}

export default memo(Time)

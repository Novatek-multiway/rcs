import { styled } from '@mui/material/styles'
import type { FC, ReactNode } from 'react'
import React, { memo, useEffect, useState } from 'react'
import { formatDate, getTimeGreeting } from 'utils'

// import { HeaderWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HeaderWrapper = styled('div')((theme) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
  color: 'white',
  '& .title': {
    fontSize: '24px'
  },
  '& .right': {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '& .time': {
      fontSize: '20px'
    }
  }
}))
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
const Header: FC<IProps> = () => {
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
    <HeaderWrapper>
      <div className="left">
        <div className="title">劢微智慧仓储可视化管理平台</div>
      </div>
      <div className="right">
        <div className="greeting">{timeGreeting}</div>
        <div className="time">{time}</div>
        <div>
          <div className="date">{date}</div>
          <div className="week">{week}</div>
        </div>
      </div>
    </HeaderWrapper>
  )
}

export default memo(Header)

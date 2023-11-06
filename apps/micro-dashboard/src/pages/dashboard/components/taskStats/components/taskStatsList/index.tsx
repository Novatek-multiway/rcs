import ListItem from '@mui/material/ListItem'
import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { Box } from 'ui'

import { TaskStatsItemWrapper } from './style'

interface ITaskStatsItemProps {
  id: number
  finishedCount: number
  time: number
}

const TaskStatsItem = (props: ListChildComponentProps & ITaskStatsItemProps) => {
  const { index, style, id, finishedCount, time } = props

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <TaskStatsItemWrapper>
        <div className="vehicle-id">车辆编号：{id}</div>
        <section>
          <div className="item finished">
            <span>已完成</span>
            <div>
              <span className="value">{finishedCount}</span>个
            </div>
          </div>
          <div className="item time">
            <span>消耗时间</span>
            <div>
              <span className="value">{time}</span>分钟
            </div>
          </div>
          <div className="item average">
            <span>时均任务</span>
            <div>
              <span className="value">{(time ? time / finishedCount : 0).toFixed(2)}</span>分钟/个
            </div>
          </div>
        </section>
      </TaskStatsItemWrapper>
    </ListItem>
  )
}

interface ITaskStatsListProps {
  data: ITaskStatsItemProps[]
}

const TaskStatsList: FC<PropsWithChildren<ITaskStatsListProps>> = (props) => {
  const { data } = props
  return (
    <Box sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList height={height} width={width} itemSize={height / 3} itemCount={data.length}>
            {(props) => <TaskStatsItem {...props} {...data[props.index]} />}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  )
}

export default memo(TaskStatsList)

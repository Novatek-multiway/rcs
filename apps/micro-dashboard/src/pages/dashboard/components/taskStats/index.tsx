import { echarts, useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useRef } from 'react'
import { Panel } from 'ui'

import TaskStatsList from './components/taskStatsList'
import { TaskStatusWrapper } from './style'

interface ITaskStatsProps {}

const total = 4
const data = [
  {
    id: 10,
    finished: 1,
    time: 0.32
  },
  {
    id: 11,
    finished: 1,
    time: 0.32
  },
  {
    id: 12,
    finished: 1,
    time: 0.32
  },
  {
    id: 14,
    finished: 0,
    time: 0
  },
  {
    id: 15,
    finished: 0,
    time: 0
  },
  {
    id: 16,
    finished: 0,
    time: 0
  },
  {
    id: 17,
    finished: 0,
    time: 0
  }
]

const option: echarts.EChartsOption = {
  backgroundColor: 'transparent',
  title: {
    text: `任务量：${total}个`,
    left: 'center',
    top: 'center',
    textStyle: {
      fontSize: 16
    }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(164, 165, 166, 0.38)',
    borderColor: 'transparent',
    borderRadius: 10,
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 700
    }
  },
  series: [
    {
      name: '已完成',
      type: 'pie',
      radius: ['65%', '80%'],
      avoidLabelOverlap: false,
      label: {
        show: true
      },
      labelLine: {
        show: false
      },
      data: data.map((d) => ({
        name: '编号：' + d.id,
        value: d.finished
      })),
      tooltip: {
        valueFormatter: (v) => v + ' 个'
      }
    }
  ]
}

// 车辆任务统计
const TaskStats: FC<PropsWithChildren<ITaskStatsProps>> = () => {
  const el = useRef<HTMLDivElement | null>(null)
  const totalFinished = useMemo(() => data.reduce((total, item) => total + item.finished, 0), [])
  // 传递元素给useEcharts
  useEcharts(el, { echartsOption: option, theme: 'dark' })
  return (
    <Panel
      title="车辆任务统计"
      wrapperStyle={{
        height: '71.5%'
      }}
      contentStyle={{
        padding: 0
      }}
    >
      <TaskStatusWrapper>
        <div className="header">
          <div className="finished">
            已完成<span>{totalFinished}</span>个
          </div>
          <div className="unfinished">
            未完成<span>{total - totalFinished}</span>个
          </div>
        </div>
        <div style={{ width: '100%', height: '40%' }} ref={el}></div>
        <div style={{ width: '100%', flex: 1 }}>
          <TaskStatsList />
        </div>
      </TaskStatusWrapper>
    </Panel>
  )
}

export default memo(TaskStats)

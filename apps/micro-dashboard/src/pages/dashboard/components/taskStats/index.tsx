import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getTaskReport } from 'apis'
import { echarts, useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useRef, useState } from 'react'
import { Panel } from 'ui'

import TaskStatsList from './components/taskStatsList'
import { TaskStatusWrapper } from './style'

interface ITaskStatsProps {}

const option: echarts.EChartsOption = {
  backgroundColor: 'transparent',
  title: {
    text: `任务量：0个`,
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
      radius: ['55%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        padding: -20,
        fontSize: 10
      },
      labelLine: {
        show: false
      },
      data: [],
      tooltip: {
        valueFormatter: (v) => v + ' 个'
      }
    }
  ]
}

// 车辆任务统计
const TaskStats: FC<PropsWithChildren<ITaskStatsProps>> = () => {
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, { echartsOption: option, theme: 'dark' })

  const [taskStatsData, setTaskStatsData] = useState<ReportAPI.AgvTaskRoot>()
  const taskStatsList = useMemo(
    () =>
      taskStatsData?.AgvList?.map((item) => ({ id: item.Id, finishedCount: item.TaskQty, time: item.ConsumeTime })) ||
      [],
    [taskStatsData]
  )

  useAsyncEffect(async () => {
    const res = await getTaskReport()
    const taskStatsData = res.data as ReportAPI.AgvTaskRoot
    setTaskStatsData(taskStatsData)
  }, [])

  useUpdateEffect(() => {
    if (!taskStatsData) return
    updateOption({
      title: {
        text: `任务量：${taskStatsData?.Finished + taskStatsData?.NotFinished}个`
      },
      series: [
        {
          data: taskStatsData.AgvList.map((d) => ({
            name: '编号-' + d.Id,
            value: d.TaskQty
          }))
        }
      ]
    })
  }, [taskStatsData])
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
            已完成<span>{Number(taskStatsData?.Finished) + Number(taskStatsData?.NotFinished)}</span>个
          </div>
          <div className="unfinished">
            未完成<span>{taskStatsData?.NotFinished}</span>个
          </div>
        </div>
        <div style={{ width: '100%', height: '40%' }} ref={el}></div>
        <div style={{ width: '100%', flex: 1 }}>
          <TaskStatsList data={taskStatsList} />
        </div>
      </TaskStatusWrapper>
    </Panel>
  )
}

export default memo(TaskStats)

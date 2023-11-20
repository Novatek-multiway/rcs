import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getTaskReport } from 'apis'
import { echarts, useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Panel } from 'ui'

import { useWebsocketStore } from '../../store/websocket'
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
  const wsTaskStatsData = useWebsocketStore((state) => state['Report/GetJobSumByAgv'])
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, { echartsOption: option, theme: 'dark' })

  const [taskStatsData, setTaskStatsData] = useState<ReportAPI.AgvTaskRoot>()
  const taskStatsList = useMemo(
    () =>
      taskStatsData?.agvList?.map((item) => ({ id: item.Id, finishedCount: item.TaskQty, time: item.ConsumeTime })) ||
      [],
    [taskStatsData]
  )

  useAsyncEffect(async () => {
    const res = await getTaskReport()
    const taskStatsData = res.data as ReportAPI.AgvTaskRoot
    setTaskStatsData(taskStatsData)
  }, [])

  const updateOptionCallback = useCallback(
    (taskStatsData: ReportAPI.AgvTaskRoot) => {
      updateOption({
        title: {
          text: `任务量：${taskStatsData?.finished + taskStatsData?.notFinished}个`
        },
        series: [
          {
            data: taskStatsData.agvList.map((d) => ({
              name: '编号-' + d.Id,
              value: d.TaskQty
            }))
          }
        ]
      })
    },
    [updateOption]
  )
  useUpdateEffect(() => {
    taskStatsData && updateOptionCallback(taskStatsData)
  }, [taskStatsData])

  useUpdateEffect(() => {
    wsTaskStatsData && setTaskStatsData(wsTaskStatsData)
  }, [wsTaskStatsData])
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
            已完成<span>{Number(taskStatsData?.finished) + Number(taskStatsData?.notFinished)}</span>个
          </div>
          <div className="unfinished">
            未完成<span>{taskStatsData?.notFinished}</span>个
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

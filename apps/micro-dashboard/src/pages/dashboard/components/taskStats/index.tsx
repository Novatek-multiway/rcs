import { useVoerkaI18n } from '@voerkai18n/react'
import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getTaskReport } from 'apis'
import { echarts, useEcharts, useIsLongLengthLanguage } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Panel } from 'ui'

import { useWebsocketStore } from '../../store/websocket'
import TaskStatsList from './components/taskStatsList'
import { TaskStatusWrapper } from './style'

interface ITaskStatsProps {}

// 车辆任务统计
const TaskStats: FC<PropsWithChildren<ITaskStatsProps>> = () => {
  const wsTaskStatsData = useWebsocketStore((state) => state['Report/GetJobSumByAgv'])
  const { t, activeLanguage } = useVoerkaI18n()
  const isLongLengthLanguage = useIsLongLengthLanguage(activeLanguage)
  const option = useRef<echarts.EChartsOption>({
    backgroundColor: 'transparent',
    title: {
      text: t('任务量：0个'),
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: isLongLengthLanguage ? 12 : 16
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
        name: t('已完成'),
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
          valueFormatter: (v) => v + t('个')
        }
      }
    ]
  })
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, {
    echartsOption: option.current,
    theme: 'dark'
  })

  useUpdateEffect(() => {
    updateOption({
      title: {
        text: t('任务量：0个')
      },
      series: [
        {
          name: t('已完成')
        }
      ]
    })
  }, [activeLanguage])

  useUpdateEffect(() => {
    updateOption({
      title: {
        textStyle: {
          fontSize: isLongLengthLanguage ? 12 : 16
        }
      }
    })
  }, [isLongLengthLanguage])

  const [taskStatsData, setTaskStatsData] = useState<ReportAPI.AgvTaskRoot>()
  const taskStatsList = useMemo(
    () =>
      taskStatsData?.agvList
        ?.map((item) => ({
          id: item.id,
          finishedCount: item.taskQty,
          time: item.consumeTime
        }))
        .sort((a, b) => b.finishedCount - a.finishedCount) || [],
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
          text: t('任务量：{BinaryExpression1}个', {
            BinaryExpression1: taskStatsData?.finished + taskStatsData?.notFinished
          })
        },
        series: [
          {
            data: taskStatsData.agvList
              .filter((d) => !!d.taskQty)
              .map((d) => ({
                name: t('编号-') + d.id,
                value: d.taskQty
              }))
          }
        ]
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      title={t('车辆任务统计')}
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
            {t('已完成')}
            <span>{Number(taskStatsData?.finished)}</span>
            {t('个')}
          </div>
          <div className="unfinished">
            {t('未完成')}
            <span>{taskStatsData?.notFinished}</span>
            {t('个')}
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

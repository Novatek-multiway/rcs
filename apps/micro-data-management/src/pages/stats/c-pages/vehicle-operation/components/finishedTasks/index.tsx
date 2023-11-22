import { useUpdateEffect } from 'ahooks'
import { useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useRef } from 'react'
import { Panel } from 'ui'

interface IFinishedTasksProps {
  labels?: string[]
  values?: { title: string; list: number[] }[]
}

const option: echarts.EChartsOption = {
  backgroundColor: 'transparent',
  legend: {},
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(164, 165, 166, 0.38)',
    borderColor: 'transparent',
    borderRadius: 10,
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 700
    }
  },
  grid: {
    left: 18,
    right: 18,
    bottom: 8,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [],
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 12
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      splitNumber: 5,
      splitLine: {
        show: true
      },
      axisLabel: {
        fontSize: 12,
        padding: 12
      }
    }
  ],
  dataZoom: {
    type: 'inside'
  },
  series: []
}

// 车辆完成任务数
const FinishedTasks: FC<PropsWithChildren<IFinishedTasksProps>> = (props) => {
  const { labels = [], values = [] } = props
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, {
    echartsOption: option,
    theme: 'dark',
    updateOptionConfig: { notMerge: true }
  })

  useUpdateEffect(() => {
    const series: echarts.EChartsOption['series'] = values.map((item) => ({
      name: item.title,
      type: 'bar',
      stack: 'finishedTasks',
      data: item.list,
      label: {
        show: true,
        color: '#fff'
      },
      tooltip: {
        valueFormatter: (v) => v + '个'
      }
    }))
    const newOption: any = { ...option }
    newOption.xAxis[0].data = labels
    newOption.series = series
    updateOption(newOption)
  }, [updateOption, labels, values])

  return (
    <Panel
      title="车辆完成任务数"
      wrapperStyle={{
        height: '100%'
      }}
      contentWrapperStyle={{
        backgroundColor: '#1d1e25'
      }}
    >
      <div style={{ height: '100%' }}>
        <div ref={el} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </Panel>
  )
}

export default memo(FinishedTasks)
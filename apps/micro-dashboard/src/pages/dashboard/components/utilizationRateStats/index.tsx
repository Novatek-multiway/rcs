import { echarts, useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useRef } from 'react'
import { Panel } from 'ui'

interface IUtilizationRateStatsProps {}

const data = [
  {
    time: '10-18',
    value: 0
  },
  {
    time: '10-19',
    value: 14
  },
  {
    time: '10-20',
    value: 23
  },
  {
    time: '10-21',
    value: 20
  },
  {
    time: '10-22',
    value: 0
  },
  {
    time: '10-23',
    value: 20
  },
  {
    time: '10-24',
    value: 0
  },
  {
    time: '10-25',
    value: 0
  }
]
const option: echarts.EChartsOption = {
  backgroundColor: 'transparent',
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
    left: 8,
    // right: '6%',
    bottom: 8,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: data.map((d) => d.time),
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
      max: 100,
      splitNumber: 5,
      splitLine: {
        show: true
      },
      axisLabel: {
        fontSize: 12
      }
    }
  ],
  dataZoom: {
    type: 'inside'
  },
  series: [
    {
      name: '稼动率',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#148df0'
      },
      // showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: 'rgba(28, 68, 135, 0.7)'
      },
      emphasis: {
        focus: 'series'
      },
      data: data.map((d) => d.value),
      label: {
        show: true,
        color: '#fff'
      }
    }
  ]
}

// 稼动率统计
const UtilizationRateStats: FC<PropsWithChildren<IUtilizationRateStatsProps>> = () => {
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  useEcharts(el, { echartsOption: option, theme: 'dark' })
  return (
    <Panel
      title="稼动率统计"
      wrapperStyle={{
        height: '40%'
      }}
    >
      <div ref={el} style={{ width: '100%', height: '100%' }}></div>
    </Panel>
  )
}

export default memo(UtilizationRateStats)

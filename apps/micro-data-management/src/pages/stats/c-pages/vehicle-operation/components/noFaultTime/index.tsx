import { useUpdateEffect } from 'ahooks'
import { useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useRef } from 'react'
import { Panel } from 'ui'

interface INoFaultTimeProps {
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
    left: 8,
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
      max: 24,
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
  series: []
}

// 无故障时间
const NoFaultTime: FC<PropsWithChildren<INoFaultTimeProps>> = (props) => {
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
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3
        // color: '#148df0'
      },
      // showSymbol: false,
      areaStyle: {
        opacity: 0.2
        // color: '#148df0'
      },
      emphasis: {
        focus: 'series'
      },
      data: item.list,
      label: {
        show: true,
        color: '#fff'
      },
      tooltip: {
        valueFormatter: (v) => v + 'h'
      }
    }))
    const newOption: any = { ...option }
    newOption.xAxis[0].data = labels
    newOption.yAxis[0].max = labels.length * 24
    newOption.series = series
    updateOption(newOption)
  }, [updateOption, labels, values])
  return (
    <Panel
      title="无故障时间"
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

export default memo(NoFaultTime)

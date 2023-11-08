import { useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useRef } from 'react'
import { Panel } from 'ui'

interface IMileageProps {}

const mockXData = ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07']
const mockYData = [
  { id: 10, data: [16, 10, 1, 15, 12, 19, 17] },
  { id: 11, data: [24, 13, 7, 20, 5, 8, 18] },
  { id: 12, data: [21, 4, 11, 14, 0, 23, 6] }
]

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

// 车辆运行公里数
const Mileage: FC<PropsWithChildren<IMileageProps>> = () => {
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, { echartsOption: option, theme: 'dark' })

  useEffect(() => {
    const series: echarts.EChartsOption['series'] = mockYData.map((item) => ({
      name: item.id,
      type: 'bar',
      stack: 'finishedTasks',
      data: item.data,
      label: {
        show: true,
        color: '#fff'
      },
      tooltip: {
        valueFormatter: (v) => v + '个'
      }
    }))
    updateOption({
      xAxis: {
        data: mockXData
      },
      series
    })
  }, [updateOption])
  return (
    <Panel
      title="车辆运行公里数"
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

export default memo(Mileage)

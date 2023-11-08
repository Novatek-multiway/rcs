import { useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useRef } from 'react'
import { Panel } from 'ui'

import { ElectricityWrapper } from './style'

interface IElectricityProps {}

const mockXData = ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07']
const mockYData = [
  { id: 10, data: [10, 12, 14, 13, 10, 12, 14] },
  { id: 11, data: [23, 21, 25, 21, 23, 21, 25] },
  { id: 12, data: [31, 83, 15, 61, 23, 91, 95] }
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
  series: []
}

// 电量统计
const Electricity: FC<PropsWithChildren<IElectricityProps>> = () => {
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, { echartsOption: option, theme: 'dark' })

  useEffect(() => {
    const series: echarts.EChartsOption['series'] = mockYData.map((item) => ({
      name: item.id,
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
      data: item.data,
      label: {
        show: true,
        color: '#fff'
      },
      tooltip: {
        valueFormatter: (v) => v + '%'
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
      title="电量统计"
      wrapperStyle={{
        height: '100%'
      }}
    >
      <ElectricityWrapper>
        <div className="stats-card">
          <div className="item">
            <span className="value">0</span>
            <span className="label">充电次数</span>
          </div>
          <div className="item">
            <span className="value">0</span>
            <span className="label">累计充满电次数</span>
          </div>
        </div>
        <div className="chart">
          <div ref={el} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </ElectricityWrapper>
    </Panel>
  )
}

export default memo(Electricity)

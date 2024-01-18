import { useVoerkaI18n } from '@voerkai18n/react'
import { useUpdateEffect } from 'ahooks'
import { useEcharts, useIsLongLengthLanguage } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useRef } from 'react'
import { Panel } from 'ui'

import { ElectricityWrapper } from './style'

interface IElectricityProps {
  count?: number
  totalCount?: number
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
const Electricity: FC<PropsWithChildren<IElectricityProps>> = (props) => {
  const { count = 0, totalCount = 0, labels = [], values = [] } = props
  const { t, activeLanguage } = useVoerkaI18n()
  const isLongLengthLanguage = useIsLongLengthLanguage(activeLanguage)
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
        valueFormatter: (v) => v + '%'
      }
    }))
    const newOption: any = { ...option }
    newOption.xAxis[0].data = labels
    newOption.series = series
    updateOption(newOption)
  }, [updateOption, labels, values])
  return (
    <Panel
      title={t('电量统计')}
      wrapperStyle={{
        height: '100%'
      }}
    >
      <ElectricityWrapper itemFontSize={isLongLengthLanguage ? '12px' : '16px'}>
        <div className="stats-card">
          <div className="item">
            <span className="value">{count}</span>
            <span className="label">{t('充电次数')}</span>
          </div>
          <div className="item">
            <span className="value">{totalCount}</span>
            <span className="label">{t('累计充满电次数')}</span>
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

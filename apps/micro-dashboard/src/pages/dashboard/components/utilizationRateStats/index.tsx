import { useVoerkaI18n } from '@voerkai18n/react'
import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getThroughReport } from 'apis'
import { echarts, useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useRef, useState } from 'react'
import { Panel } from 'ui'

import { useWebsocketStore } from '../../store/websocket'

interface IUtilizationRateStatsProps {}

// 稼动率统计
const UtilizationRateStats: FC<PropsWithChildren<IUtilizationRateStatsProps>> = () => {
  const wsUtilizationRateStatsData = useWebsocketStore((state) => state['Report/GetAgvThroughs'])
  const { t, activeLanguage } = useVoerkaI18n()
  const option = useRef<echarts.EChartsOption>({
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
    series: [
      {
        name: t('稼动率'),
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
        data: [],
        label: {
          show: true,
          color: '#fff'
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
      series: [
        {
          name: t('稼动率')
        }
      ]
    })
  }, [activeLanguage])

  const [utilizationRateStatsData, setUtilizationRateStatsData] = useState<ReportAPI.Through>()
  useAsyncEffect(async () => {
    const res = await getThroughReport()
    const utilizationRateData = res.data as ReportAPI.Through
    setUtilizationRateStatsData(utilizationRateData)
  }, [])

  const updateOptionCallback = useCallback(
    (utilizationRateStatsData: ReportAPI.Through) => {
      const data = utilizationRateStatsData?.labels.reduce((acc: number[], cur, index) => {
        const utilizationRate = utilizationRateStatsData.values?.reduce((total, item) => total + item.list[index], 0)
        return acc.concat([utilizationRate / utilizationRateStatsData.values.length])
      }, [])
      updateOption({
        xAxis: {
          data: utilizationRateStatsData?.labels || []
        },
        series: [
          {
            data
          }
        ]
      })
    },
    [updateOption]
  )
  useUpdateEffect(() => {
    utilizationRateStatsData && updateOptionCallback(utilizationRateStatsData)
  }, [utilizationRateStatsData])

  useUpdateEffect(() => {
    wsUtilizationRateStatsData && setUtilizationRateStatsData(wsUtilizationRateStatsData)
  }, [wsUtilizationRateStatsData])
  return (
    <Panel
      title={t('稼动率统计')}
      wrapperStyle={{
        height: '40%'
      }}
    >
      <div ref={el} style={{ width: '100%', height: '100%' }}></div>
    </Panel>
  )
}

export default memo(UtilizationRateStats)

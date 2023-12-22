import { useVoerkaI18n } from '@voerkai18n/react'
import { useUpdateEffect } from 'ahooks'
import { useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useRef } from 'react'
import { Panel } from 'ui'

interface IElapsedTimeRatioProps {
  workTime?: number
  chargeTime?: number
  trafficTime?: number
  freeTime?: number
}

// 车辆运行时间占比
const ElapsedTimeRatio: FC<PropsWithChildren<IElapsedTimeRatioProps>> = (props) => {
  const { freeTime = 0, workTime = 0, trafficTime = 0, chargeTime = 0 } = props
  const { t, activeLanguage } = useVoerkaI18n()
  const el = useRef<HTMLDivElement | null>(null)
  const option: echarts.EChartsOption = useMemo(
    () => ({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(164, 165, 166, 0.38)',
        borderColor: 'transparent',
        borderRadius: 10,
        textStyle: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 700
        },
        valueFormatter: (v) => v + '%'
      },
      legend: {
        icon: 'circle'
      },
      series: [
        {
          name: t('车辆运行时间占比'),
          type: 'pie',
          radius: ['0%', '70%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          label: {
            show: true
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            borderColor: 'rgb(27, 28, 33)',
            borderWidth: 2
          },
          data: [
            {
              name: t('运行'),
              value: 25,
              itemStyle: {
                color: '#3394eb'
              }
            },
            {
              name: t('充电'),
              value: 25,
              itemStyle: {
                color: '#3dc274'
              }
            },
            {
              name: t('堵车'),
              value: 25,
              itemStyle: {
                color: '#d5665c'
              }
            },
            {
              name: t('待命'),
              value: 25,
              itemStyle: {
                color: '#eba653'
              }
            }
          ]
        }
      ]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, {
    echartsOption: option,
    theme: 'dark'
  })
  useUpdateEffect(() => {
    updateOption({
      series: [
        {
          name: t('车辆运行时间占比'),
          data: [
            {
              name: t('运行'),
              value: 25
            },
            {
              name: t('充电'),
              value: 25
            },
            {
              name: t('堵车'),
              value: 25
            },
            {
              name: t('待命'),
              value: 25
            }
          ]
        }
      ]
    })
  }, [activeLanguage])

  useUpdateEffect(() => {
    const total = workTime + chargeTime + trafficTime + freeTime
    updateOption({
      series: [
        {
          label: {
            formatter: (params: any) => {
              const v1 = parseFloat(params.value as string)
              const showValue = `${((v1 / total) * 100).toFixed(2)}%`
              return `${showValue}`
            }
          },
          data: [
            {
              name: t('运行'),
              value: workTime
            },
            {
              name: t('充电'),
              value: chargeTime
            },
            {
              name: t('堵车'),
              value: trafficTime
            },
            {
              name: t('待命'),
              value: freeTime
            }
          ]
        }
      ],

      tooltip: {
        valueFormatter: (v) => {
          const v1 = parseFloat(v as any)
          return `${v1}h（${((v1 / total) * 100).toFixed(4)}%）`
        }
      }
    })
  }, [freeTime, workTime, trafficTime, chargeTime])
  return (
    <Panel
      title={t('车辆运行时间占比')}
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

export default memo(ElapsedTimeRatio)

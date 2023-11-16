import { useUpdateEffect } from 'ahooks'
import { useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useRef } from 'react'
import { Panel } from 'ui'

interface IElapsedTimeRatioProps {
  workTime?: number
  chargeTime?: number
  trafficTime?: number
  freeTime?: number
}

const option: echarts.EChartsOption = {
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
      name: '车辆运行时间占比',
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
      data: [
        {
          name: '运行',
          value: 25,
          itemStyle: {
            color: '#3394eb'
          }
        },
        {
          name: '充电',
          value: 25,
          itemStyle: {
            color: '#3dc274'
          }
        },
        {
          name: '堵车',
          value: 25,
          itemStyle: {
            color: '#d5665c'
          }
        },
        {
          name: '待命',
          value: 25,
          itemStyle: {
            color: '#eba653'
          }
        }
      ]
    }
  ]
}

// 车辆运行时间占比
const ElapsedTimeRatio: FC<PropsWithChildren<IElapsedTimeRatioProps>> = (props) => {
  const { freeTime = 0, workTime = 0, trafficTime = 0, chargeTime = 0 } = props
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, { echartsOption: option, theme: 'dark' })

  useUpdateEffect(() => {
    const total = workTime + chargeTime + trafficTime + freeTime
    updateOption({
      series: [
        {
          data: [
            {
              name: '运行',
              value: ((workTime / total) * 100).toFixed(4)
            },
            {
              name: '充电',
              value: ((chargeTime / total) * 100).toFixed(4)
            },
            {
              name: '堵车',
              value: ((trafficTime / total) * 100).toFixed(4)
            },
            {
              name: '待命',
              value: ((freeTime / total) * 100).toFixed(4)
            }
          ]
        }
      ]
    })
  }, [freeTime, workTime, trafficTime, chargeTime])
  return (
    <Panel
      title="车辆运行时间占比"
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

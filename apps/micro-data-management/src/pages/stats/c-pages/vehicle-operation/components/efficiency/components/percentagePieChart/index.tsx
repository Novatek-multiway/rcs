import { useEcharts } from 'hooks'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useRef } from 'react'

interface IPercentagePieChartProps {
  label: string
  value: number
}

const option: echarts.EChartsOption = {
  backgroundColor: 'transparent',
  title: {
    text: `0%`,
    subtext: '车辆利用率',
    left: 'center',
    top: '40%',
    textStyle: {
      fontSize: 30
    },
    itemGap: 150,
    subtextStyle: {
      fontSize: 14,
      color: '#fff'
    }
  },
  series: [
    {
      name: '车辆利用率',
      type: 'pie',
      radius: ['45%', '80%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      emphasis: {
        disabled: true
      },
      data: []
    }
  ]
}

const PercentagePieChart: FC<PropsWithChildren<IPercentagePieChartProps>> = (props) => {
  const { label, value } = props
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, { echartsOption: option, theme: 'dark' })

  useEffect(() => {
    updateOption({
      title: {
        text: `${value}%`,
        subtext: label
      },
      series: [
        {
          data: [
            {
              value: value,
              name: label,
              itemStyle: {
                color: '#00d9c6'
              }
            },
            {
              value: 100 - value,
              name: 'difference',
              itemStyle: {
                color: '#727479'
              }
            }
          ]
        }
      ]
    })
  }, [updateOption, value, label])
  return (
    <div ref={el} style={{ width: '100%', height: '100%' }}>
      PercentagePieChart
    </div>
  )
}

export default memo(PercentagePieChart)

import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getTimeSum } from 'apis'
import { echarts, useEcharts } from 'hooks'
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useRef, useState } from 'react'
import { Panel } from 'ui'

interface ITimeStatsProps {}

type TimeStatsItem = {
  id: number
  workTime: number
  freeTime: number
  errorTime: number
  average: number
}

const WORK_COLOR = 'rgba(64, 211, 124, 0.7)'
const FREE_COLOR = 'rgba(65, 67, 68, 0.7)'
const ERROR_COLOR = 'rgba(247, 86, 79, 0.7)'
const AVERAGE_COLOR = 'rgb(255, 180, 88)'

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
  legend: {
    textStyle: {
      fontSize: 10,
      color: '#fff',
      fontWeight: 700
    },
    itemWidth: 15
  },
  dataZoom: {
    type: 'inside'
  },
  grid: {
    right: 36,
    left: 36,
    bottom: 24
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisPointer: {
        type: 'shadow'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '时间',
      min: 0,
      max: 24,
      interval: 4,
      axisLabel: {
        formatter: '{value}h'
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    {
      type: 'value',
      name: '时均任务',
      axisLabel: {
        formatter: '{value}个'
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '有效时间',
      type: 'bar',
      stack: 'time',
      tooltip: {
        valueFormatter: function (value) {
          return value + 'h'
        }
      },
      data: [],
      itemStyle: {
        color: WORK_COLOR,
        borderRadius: [0, 0, 5, 5]
      }
    },
    {
      name: '空闲时间',
      type: 'bar',
      stack: 'time',
      tooltip: {
        valueFormatter: function (value) {
          return value + 'h'
        }
      },
      data: [],

      itemStyle: {
        color: FREE_COLOR,
        borderRadius: [0, 0, 0, 0]
      }
    },
    {
      name: '故障时间',
      type: 'bar',
      stack: 'time',
      tooltip: {
        valueFormatter: function (value) {
          return value + 'h'
        }
      },
      data: [],

      itemStyle: {
        color: ERROR_COLOR,
        borderRadius: [5, 5, 0, 0]
      }
    },
    {
      name: '时均任务',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + '个'
        }
      },
      data: [],

      itemStyle: {
        color: AVERAGE_COLOR
      }
    }
  ]
}

// 车辆时间统计
const TimeStats: FC<PropsWithChildren<ITimeStatsProps>> = () => {
  const el = useRef<HTMLDivElement | null>(null)
  // 传递元素给useEcharts
  const { updateOption } = useEcharts(el, { echartsOption: option, theme: 'dark' })

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<TimeStatsItem>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: '编号',
        size: 50
      },
      {
        accessorKey: 'workTime',
        header: '有效时间',
        size: 50,
        Cell: ({ cell }) => cell.getValue() + ' h'
      },
      {
        accessorKey: 'freeTime', //normal accessorKey
        header: '空闲时间',
        size: 50,
        Cell: ({ cell }) => cell.getValue() + ' h'
      },
      {
        accessorKey: 'errorTime',
        header: '故障时间',
        size: 50,
        Cell: ({ cell }) => cell.getValue() + ' h'
      },
      {
        accessorKey: 'average',
        header: '时均任务',
        size: 50,
        Cell: ({ cell }) => cell.getValue() + ' 个'
      }
    ],
    []
  )

  const [taskStatsData, setTaskStatsData] = useState<ReportAPI.TimeSumDatum[]>([])
  const table = useMaterialReactTable({
    columns,
    data: taskStatsData,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableStickyHeader: true,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: 'none'
      }
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: '218px',
        height: '100%'
      }
    },
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd) > td': {
          backgroundColor: 'rgb(26, 29, 36)'
        },
        '& tr:nth-of-type(even) > td': {
          backgroundColor: 'transparent'
        },
        '& td:nth-of-type(2)': {
          color: WORK_COLOR
        },
        '& td:nth-of-type(3)': {
          color: 'rgb(115, 119, 122)'
        },
        '& td:nth-of-type(4)': {
          color: ERROR_COLOR
        },
        '& td:nth-of-type(5)': {
          color: AVERAGE_COLOR
        }
      }
    },
    muiTableHeadCellProps: {
      sx: {
        border: 'none',
        padding: '6px 2px !important',
        fontSize: '13px',
        background: 'rgb(36, 38, 47)',
        textAlign: 'center',
        '.Mui-TableHeadCell-Content-Labels, .Mui-TableHeadCell-Content-Wrapper': {
          width: '100%'
        }
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border: 'none',
        padding: '6px 2px',
        fontSize: '13px',
        textAlign: 'center'
      }
    }
  })

  useAsyncEffect(async () => {
    const res = await getTimeSum()
    const newTaskStatsData = res.data as ReportAPI.TimeSumDatum[]
    setTaskStatsData(newTaskStatsData)
  }, [])

  useUpdateEffect(() => {
    updateOption({
      xAxis: {
        data: taskStatsData.map((item) => item.id)
      },
      series: [
        {
          data: taskStatsData.map((item) => item.workTime)
        },
        {
          data: taskStatsData.map((item) => item.freeTime)
        },
        {
          data: taskStatsData.map((item) => item.errorTime)
        },
        {
          data: taskStatsData.map((item) => item.average)
        }
      ]
    })
  }, [taskStatsData, updateOption])

  return (
    <Panel
      title="车辆时间统计"
      wrapperStyle={{
        height: '60%'
      }}
    >
      <div ref={el} style={{ width: '100%', height: '55%' }}></div>
      <div style={{ height: '45%' }}>
        <MaterialReactTable table={table} />
      </div>
    </Panel>
  )
}

export default memo(TimeStats)

import { echarts, useEcharts } from 'hooks'
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useRef } from 'react'
import { Panel } from 'ui'

interface ITimeStatsProps {}

type TimeStatsItem = {
  id: number
  workTime: number
  freeTime: number
  errorTime: number
  averageTaskByTime: number
}

//nested data is ok, see accessorKeys in ColumnDef below
const data: TimeStatsItem[] = [
  {
    id: 10,
    workTime: 3,
    freeTime: 21,
    errorTime: 0,
    averageTaskByTime: 12
  },
  {
    id: 11,
    workTime: 12,
    freeTime: 11,
    errorTime: 1,
    averageTaskByTime: 12.2
  },
  {
    id: 12,
    workTime: 5,
    freeTime: 16,
    errorTime: 3,
    averageTaskByTime: 13.3
  },
  {
    id: 13,
    workTime: 12,
    freeTime: 12,
    errorTime: 0,
    averageTaskByTime: 12
  },
  {
    id: 14,
    workTime: 4,
    freeTime: 18,
    errorTime: 2,
    averageTaskByTime: 12.3
  }
]

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
      data: data.map((d) => d.id),
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
      data: data.map((d) => d.workTime),
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
      data: data.map((d) => d.freeTime),

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
      data: data.map((d) => d.errorTime),

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
      data: data.map((d) => d.averageTaskByTime),

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
  useEcharts(el, { echartsOption: option, theme: 'dark' })

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<TimeStatsItem>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: '编号',
        size: 50
      },
      {
        accessorKey: 'id',
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
        accessorKey: 'averageTaskByTime',
        header: '时均任务',
        size: 50,
        Cell: ({ cell }) => cell.getValue() + ' 个'
      }
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data,
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
        maxHeight: '235px',
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

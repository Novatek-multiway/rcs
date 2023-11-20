import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo } from 'react'
import { BaseTable, Button, createMRTColumnHelper } from 'ui'

import { ITaskItem } from './type'

export interface IActionPointListProps {
  data?: ITaskItem[]
  onMoveUp?: (index: number) => void
  onDelete?: (index: number) => void
}

const columnHelper = createMRTColumnHelper<ITaskItem>()

const ActionPointList: FC<PropsWithChildren<IActionPointListProps>> = (props) => {
  const { data = [], onMoveUp, onDelete } = props
  const columns = useMemo(
    () => [
      columnHelper.accessor('taskPoint', {
        header: '任务点',
        size: 60
      }),
      columnHelper.accessor('action', {
        header: '动作类型',
        size: 60
      }),
      columnHelper.accessor('params', {
        header: '参数信息',
        size: 80
      }),
      columnHelper.accessor('id', {
        header: '轴ID',
        size: 80
      }),
      columnHelper.accessor('isAutoCompleted', {
        header: '自动结束',
        size: 40,
        Cell: ({ row }) => <span>{row.original.isAutoCompleted ? '是' : '否'}</span>
      }),
      columnHelper.accessor('handler', {
        header: '操作',
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="text"
              size="small"
              sx={{
                paddingX: 0.5,
                minWidth: 36
              }}
              onClick={() => {
                onMoveUp?.(row.index)
              }}
            >
              上移
            </Button>
            /
            <Button
              color="error"
              variant="text"
              size="small"
              sx={{
                paddingX: 0.5,
                minWidth: 36
              }}
              onClick={() => {
                onDelete?.(row.index)
              }}
            >
              删除
            </Button>
          </div>
        )
      })
    ],
    [onMoveUp, onDelete]
  )

  return (
    <BaseTable
      columns={columns}
      data={data}
      enableSorting={false}
      enablePagination={false}
      enableTopToolbar={false}
      enableBottomToolbar={false}
      muiTableHeadCellProps={{
        align: 'center'
      }}
      muiTableBodyCellProps={{
        align: 'center'
      }}
    ></BaseTable>
  )
}

export default memo(ActionPointList)

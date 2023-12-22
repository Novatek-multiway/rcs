import { useVoerkaI18n } from '@voerkai18n/react'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo } from 'react'
import { useDictStore } from 'store'
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
  const { t } = useVoerkaI18n()
  const columns = useMemo(
    () => [
      columnHelper.accessor('taskPoint', {
        header: t('任务点'),
        size: 60
      }),
      columnHelper.accessor('action', {
        header: t('动作类型'),
        size: 60,
        Cell: ({ row }) => {
          const orderActionOptions = useDictStore((state) => state.dicts.OrderActionType)
          const currentAction = row.original.action
          const label = orderActionOptions.find((item: any) => item.value === currentAction)?.label

          return <span>{label}</span>
        }
      }),
      columnHelper.accessor('params', {
        header: t('参数信息'),
        size: 80
      }),
      columnHelper.accessor('id', {
        header: t('轴ID'),
        size: 80
      }),
      columnHelper.accessor('isAutoCompleted', {
        header: t('自动结束'),
        size: 40,
        Cell: ({ row }) => <span>{row.original.isAutoCompleted ? t('是') : t('否')}</span>
      }),
      columnHelper.accessor('handler', {
        header: t('操作'),
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
              {t('上移')}
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
              {t('删除')}
            </Button>
          </div>
        )
      })
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      enableStickyHeader
      enableRowNumbers
      muiTableHeadCellProps={{
        align: 'center'
      }}
      muiTableBodyCellProps={{
        align: 'center'
      }}
      muiTableContainerProps={{
        sx: {
          maxHeight: '488px',
          height: '100%'
        }
      }}
    ></BaseTable>
  )
}

export default memo(ActionPointList)

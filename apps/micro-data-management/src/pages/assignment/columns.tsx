import { useVoerkaI18n } from '@voerkai18n/react'
import { cancelTask, completeTask } from 'apis'
import { useDictStore } from 'store'
import { Chip, MRT_ColumnDef, Switch, Tooltip } from 'ui'

import DelButton, { IDelButtonProps } from '@/component/delButton'
export const TaskColumn: (props: { refreshTable: () => void }) => MRT_ColumnDef<any>[] = ({ refreshTable }) => {
  const { t } = useVoerkaI18n()
  return [
    {
      accessorKey: 'id',
      id: 'id',
      header: t('任务组ID'),
      size: 60
    },
    {
      accessorKey: 'taskCarrier',
      id: 'taskCarrier',
      header: t('分配小车'),
      Cell: ({ row }) => {
        const { original } = row
        const { tasks } = original
        return <Chip label={tasks[0].taskCarrier} color="primary" size="small"></Chip>
      }
    },
    {
      accessorKey: 'taskPoint',
      id: 'taskPoint',
      header: t('任务点'),
      minSize: 158,
      maxSize: 300,
      Cell: ({ row }) => {
        const { original } = row

        const { tasks } = original
        return (
          <Chip
            color="primary"
            size="small"
            label={tasks[0].actionPoint.map((p: any) => p.vertexID).join('>')}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '160px'
            }}
          ></Chip>
        )
      }
    },
    {
      accessorKey: 'orderCode',
      id: 'orderCode',
      header: t('组Guid'),
      Cell: ({ row }) => {
        return (
          <Tooltip title={row.original.orderCode} placement="top">
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '120px'
              }}
            >
              {row.original.orderCode}
            </div>
          </Tooltip>
        )
      }
    },
    {
      accessorKey: 'isLoop',
      id: 'isLoop',
      header: t('是否循环任务'),
      Cell: ({ row }) => {
        return (
          <>
            <Switch checked={row.original.isLoop} />
          </>
        )
      }
    },
    {
      accessorKey: 'loopCount',
      id: 'loopCount',
      header: t('执行次数')
    },
    {
      accessorKey: 'loopTime',
      id: 'loopTime',
      header: t('已执行次数')
    },
    {
      accessorKey: 'actions',
      header: t('操作'),
      enableColumnActions: false,
      Cell: ({ row }) => {
        const handleCancel: IDelButtonProps['delFn'] = async () => {
          await cancelTask(row.original.orderCode)
          refreshTable()
        }
        return (
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '0.5rem',
              width: '80px'
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <DelButton
              delFn={handleCancel}
              disabled={row.original.isCancel || row.original.tasks[0].state === 0}
              color="error"
            >
              {t('设置取消')}
            </DelButton>
          </div>
        )
      }
    }
  ]
}

export const ChildTaskColumn: (props: { refreshTable: () => void }) => MRT_ColumnDef<any>[] = ({ refreshTable }) => {
  const { t } = useVoerkaI18n()
  return [
    {
      accessorKey: 'id',
      header: t('任务ID')
    },
    {
      accessorKey: 'goal',
      header: t('终点')
    },
    {
      accessorKey: 'taskCarrier',
      header: t('分配小车'),
      Cell: ({ row }) => {
        const { original } = row
        const { taskCarrier } = original
        return <Chip label={taskCarrier} color="primary" size="small"></Chip>
      }
    },
    {
      accessorKey: 'priority',
      header: t('优先级')
    },
    {
      accessorKey: 'taskCode',
      header: t('任务GUID'),
      Cell: ({ row }) => {
        return (
          <Tooltip title={row.original.taskCode} placement="top">
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '150px'
              }}
            >
              {row.original.taskCode}
            </div>
          </Tooltip>
        )
      }
    },
    {
      accessorKey: 'action',
      header: t('任务类型'),
      Cell: ({ row }) => {
        const taskTypeOptions = useDictStore((state) => state.dicts.TaskType)
        const type = row.original.type
        const label = taskTypeOptions.find((item: any) => item.value === type)?.label
        return <span>{label}</span>
      }
    },
    {
      accessorKey: 'state',
      header: t('状态'),
      Cell: ({ row }) => {
        const taskStateOptions = useDictStore((state) => state.dicts.TaskState)
        const currentState = row.original.state
        const label = taskStateOptions.find((item: any) => item.value === currentState)?.label
        return <span>{label}</span>
      }
    },
    {
      accessorKey: 'actions',
      header: t('操作'),
      enableColumnActions: false,
      Cell: ({ row }) => {
        const handleComplete = async () => {
          await completeTask(row.original.taskCode)
          refreshTable()
        }
        return (
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '0.5rem',
              width: '100px'
            }}
          >
            <DelButton
              size="small"
              delFn={handleComplete}
              disabled={row.original.state === 5 || row.original.state === 0}
            >
              {t('设置完成')}
            </DelButton>
          </div>
        )
      }
    }
  ]
}

export const TaskPointsColumn: () => MRT_ColumnDef<any>[] = () => {
  const { t } = useVoerkaI18n()
  return [
    {
      accessorKey: 'vertexID',
      header: t('路径点')
    },
    {
      accessorKey: 'axisID',
      header: t('轴ID')
    },
    {
      accessorKey: 'action',
      header: t('动作类型'),
      Cell: ({ row }) => {
        const orderActionOptions = useDictStore((state) => state.dicts.OrderActionType)
        const currentAction = row.original.action
        const label = orderActionOptions.find((item: any) => item.value === currentAction)?.label
        return <span>{label}</span>
      }
    },
    {
      accessorKey: 'state',
      header: t('状态'),
      Cell: ({ row }) => {
        const commandStateOptions = useDictStore((state) => state.dicts.CommandState)
        const currentState = row.original.state
        const label = commandStateOptions.find((item: any) => item.value === currentState)?.label
        return <span>{label}</span>
      }
    },
    {
      accessorKey: 'param',
      header: t('参数信息'),
      Cell: ({ row }) => row.original.param.join('-')
    },
    {
      accessorKey: 'actionDelay',
      header: t('动作延迟')
    }
  ]
}

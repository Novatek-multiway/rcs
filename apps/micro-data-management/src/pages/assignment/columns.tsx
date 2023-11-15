import { cancelTask, completeTask } from 'apis'
import { useDictStore } from 'store'
import { Box, Chip, Divider, Grid, MRT_ColumnDef, Switch, Tooltip } from 'ui'

import DelButton, { IDelButtonProps } from '@/component/delButton'
export const TaskColumn: (props: { refreshTable: () => void }) => MRT_ColumnDef<any>[] = ({ refreshTable }) => [
  {
    accessorKey: 'id',
    id: 'id',
    header: '任务组ID',
    size: 60
  },
  {
    accessorKey: 'taskCarrier',
    id: 'taskCarrier',
    header: '分配小车',
    Cell: ({ row }) => {
      const { original } = row
      const { tasks } = original
      return <Chip label={tasks[0].taskCarrier} color="primary" size="small"></Chip>
    }
  },
  {
    accessorKey: 'taskPoint',
    id: 'taskPoint',
    header: '任务点',
    minSize: 148,
    maxSize: 300,
    Cell: ({ row }) => {
      const { original } = row

      const { tasks } = original
      const tasksVDom = () => {
        if (!tasks.length) {
          return <></>
        }
        return (
          <>
            <Grid container>
              {tasks[0].actionPoint?.map((item: { vertexID: string }, i: number) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Chip key={item.vertexID + i} size="small" label={item.vertexID} variant="outlined" color="primary" />
                  {i !== tasks[0].actionPoint.length - 1 && (
                    <Divider orientation="vertical" flexItem>
                      -
                    </Divider>
                  )}
                </Box>
              ))}
            </Grid>
          </>
        )
      }
      return <>{tasksVDom()}</>
    }
  },
  {
    accessorKey: 'description',
    id: 'description',
    header: '描述',
    Cell: ({ row }) => {
      return (
        <Tooltip title={row.original.description} placement="top">
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '120px'
            }}
          >
            {row.original.description}
          </div>
        </Tooltip>
      )
    }
  },
  {
    accessorKey: 'isLoop',
    id: 'isLoop',
    header: '是否循环任务',
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
    header: '执行次数'
  },
  {
    accessorKey: 'loopTime',
    id: 'loopTime',
    header: '已执行次数'
  },
  {
    accessorKey: 'actions',
    header: '操作',
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
            width: '100px'
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <DelButton delFn={handleCancel} disabled={row.original.isCancel} color="error">
            设置取消
          </DelButton>
        </div>
      )
    }
  }
]

export const ChildTaskColumn: (props: { refreshTable: () => void }) => MRT_ColumnDef<any>[] = ({ refreshTable }) => [
  {
    accessorKey: 'id',
    header: '任务ID'
  },
  {
    accessorKey: 'goal',
    header: '终点'
  },
  {
    accessorKey: 'taskCarrier',
    header: '分配小车',
    Cell: ({ row }) => {
      const { original } = row
      const { taskCarrier } = original
      return <Chip label={taskCarrier} color="primary" size="small"></Chip>
    }
  },
  {
    accessorKey: 'priority',
    header: '优先级'
  },
  {
    accessorKey: 'taskCode',
    header: '任务GUID',
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
    header: '动作类型',
    Cell: ({ row }) => {
      const orderActionOptions = useDictStore((state) => state.dicts.OrderActionType)
      const currentAction = row.original.actionPoint[0].action
      const label = orderActionOptions.find((item: any) => item.value === currentAction)?.label
      return <span>{label}</span>
    }
  },
  {
    accessorKey: 'state',
    header: '状态',
    Cell: ({ row }) => {
      const taskStateOptions = useDictStore((state) => state.dicts.TaskState)
      const currentState = row.original.state
      const label = taskStateOptions.find((item: any) => item.value === currentState)?.label
      return <span>{label}</span>
    }
  },
  {
    accessorKey: 'actions',
    header: '操作',
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
          <DelButton size="small" delFn={handleComplete}>
            设置完成
          </DelButton>
        </div>
      )
    }
  }
]

export const TaskPointsColumn: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'vertexID',
    header: '路径点'
  },
  {
    accessorKey: 'axisID',
    header: '轴ID'
  },
  {
    accessorKey: 'action',
    header: '动作类型',
    Cell: ({ row }) => {
      const orderActionOptions = useDictStore((state) => state.dicts.OrderActionType)
      const currentAction = row.original.action
      const label = orderActionOptions.find((item: any) => item.value === currentAction)?.label
      return <span>{label}</span>
    }
  },
  {
    accessorKey: 'state',
    header: '状态',
    Cell: ({ row }) => {
      const taskStateOptions = useDictStore((state) => state.dicts.TaskState)
      const currentState = row.original.state
      const label = taskStateOptions.find((item: any) => item.value === currentState)?.label
      return <span>{label}</span>
    }
  },
  {
    accessorKey: 'param',
    header: '参数信息',
    Cell: ({ row }) => row.original.param.join('-')
  },
  {
    accessorKey: 'actionDelay',
    header: '动作延迟'
  }
]

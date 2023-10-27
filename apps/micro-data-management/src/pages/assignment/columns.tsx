import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Chip, Divider, Grid, Switch } from 'ui'
export const TaskColumn = [
  {
    accessorKey: 'id',
    id: 'id',
    header: '任务组ID'
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
    minSize: 300,
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
    accessorKey: 'taskDirection',
    id: 'taskDirection',
    header: '描述'
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
    Cell: () => {
      return (
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '0.5rem',
            width: '100px'
          }}
        >
          <Button component="label" size="small" startIcon={<DeleteIcon />}>
            设置取消
          </Button>
        </div>
      )
    }
  }
]

export const ChildTaskColumn = [
  {
    accessorKey: 'id',
    header: '任务组ID'
  },
  {
    accessorKey: 'areaID',
    header: '任务点'
  },
  {
    accessorKey: 'taskCarrier',
    header: '分配小车'
  },
  {
    accessorKey: 'groupSeq',
    header: '优先级'
  },
  {
    accessorKey: 'taskCode',
    header: '任务GUID'
  },
  {
    accessorKey: 'type',
    header: '任务类型'
  },
  {
    accessorKey: 'state',
    header: '状态'
  },
  {
    accessorKey: 'actions',
    header: '操作',
    enableColumnActions: false,
    Cell: () => {
      return (
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '0.5rem',
            width: '100px'
          }}
        >
          <Button component="label" size="small" startIcon={<DeleteIcon />}>
            设置完成
          </Button>
        </div>
      )
    }
  }
]

export const TaskPointsColumn = [
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
    header: '动作类型'
  },
  {
    accessorKey: 'state',
    header: '状态'
  },
  {
    accessorKey: 'param',
    header: '参考信息',
    Set: () => {
      return <div>123</div>
    }
  },
  {
    accessorKey: 'actionDelay',
    header: '动作延迟'
  }
]

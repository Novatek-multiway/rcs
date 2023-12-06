import { getControlStateById, getGetCarrierTrack } from 'apis'
import * as React from 'react'
import { useDictStore } from 'store'
import { BaseTable, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from 'ui'

const InfoDialog: React.FC<{
  open: boolean
  onClose?: () => void
  callback?: () => void
  row?: Record<string, any>
}> = ({ open, onClose = () => {}, callback, row = {} }) => {
  const [tableData, setTableData] = React.useState([])
  const theme = useTheme()
  const { dicts } = useDictStore()

  const _Dict = React.useMemo(() => {
    const obj: any = {},
      ary = ['ControlState', 'GraphGenus', 'RouteState']
    ary.forEach((key: string) => {
      if (!dicts[key] || !dicts[key]?.length) dicts[key] = []
      dicts[key]?.forEach((item: any) => {
        !obj[key] && (obj[key] = {})
        obj[key][item.value] = item.label
      })
    })
    return obj
  }, [dicts])

  React.useEffect(() => {
    console.log('_Dict', _Dict)
  }, [_Dict])

  const [carrierControlState, setCarrierControlState] = React.useState<any>({})
  React.useEffect(() => {
    const timer = setInterval(async () => {
      if (open) {
        const carrierControlStateData = await getControlStateById(row?.id)
        setCarrierControlState(carrierControlStateData.data || {})
        const { data } = await getGetCarrierTrack(row?.id)
        setTableData(data || [])
      }
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [open, row])

  const column = [
    {
      accessorKey: 'type',
      id: 'type',
      header: '路径类型',
      Cell: ({ cell }: any) => {
        return <div>{_Dict['GraphGenus'][cell.getValue()]}</div>
      }
    },
    {
      accessorKey: 'id',
      id: 'id',
      header: '路径编号'
    },
    {
      accessorKey: 'state1',
      id: 'state1',
      header: '调度状态',
      Cell: ({ cell }: any) => {
        return (
          <div style={{ color: cell.getValue() === 5 ? '#00cbca' : '#fff' }}>
            {_Dict['RouteState'][cell.getValue()]}
          </div>
        )
      }
    },
    {
      accessorKey: 'state',
      id: 'state',
      header: '路径状态'
    }
  ]

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>路径状态</DialogTitle>
      <DialogContent
        sx={{
          py: `${theme.spacing(3.25)} !important`
        }}
      >
        <div style={{ display: 'flex', width: '100%', gap: 20 }}>
          <TextField
            InputProps={{
              readOnly: true
            }}
            label="车辆编号"
            variant="filled"
            focused
            value={carrierControlState.id}
            style={{ flex: 1 }}
          />
          <TextField
            InputProps={{
              readOnly: true
            }}
            label="车辆位置"
            variant="filled"
            focused
            value={carrierControlState.x + '-' + carrierControlState.y + '-' + carrierControlState.z}
            style={{ flex: 1 }}
          />
          <TextField
            InputProps={{
              readOnly: true
            }}
            label="当前电量"
            variant="filled"
            focused
            value={carrierControlState.elecQuantity}
            style={{ flex: 1 }}
          />
        </div>
        <div style={{ display: 'flex', width: '100%', gap: 20, marginTop: 10 }}>
          <TextField
            InputProps={{
              readOnly: true
            }}
            label="车辆速度"
            variant="filled"
            focused
            value={carrierControlState.speed}
            style={{ flex: 1 }}
          />
          <TextField
            InputProps={{
              readOnly: true
            }}
            label="控制状态"
            variant="filled"
            focused
            style={{ flex: 1 }}
            value={_Dict['ControlState'] ? _Dict['ControlState'][carrierControlState.controlState] : '-'}
          />
          <TextField
            InputProps={{
              readOnly: true
            }}
            label="交管车辆"
            variant="filled"
            focused
            style={{ flex: 1 }}
            value={carrierControlState.trafficControlCar}
          />
        </div>
        <div style={{ height: 10 }}></div>
        <BaseTable
          columns={column}
          data={tableData || []}
          enableStickyHeader={true}
          enableTopToolbar={false}
          enablePagination={false}
          muiTablePaperProps={{
            sx: {
              height: '100%',
              padding: 2
            }
          }}
          muiTableContainerProps={{
            sx: {
              maxHeight: 400
            }
          }}
        ></BaseTable>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={async () => {
            onClose()
            callback && callback()
          }}
        >
          保存
        </Button>
        <Button color="warning" onClick={onClose}>
          关闭
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default InfoDialog

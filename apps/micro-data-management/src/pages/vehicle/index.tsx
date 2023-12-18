import AddIcon from '@mui/icons-material/Add'
import { useAsyncEffect, useRequest } from 'ahooks'
import {
  delCreateCarrier,
  getAreaInfos,
  getChassisInfos,
  getSimulationCarrierLogin,
  postGetCarrierInfo,
  postGetControlOptions,
  postGetControlStates,
  postRemoveCarrier,
  postSendRemoteStop,
  postUpdateCarrierState
} from 'apis'
import { useMemo, useState } from 'react'
import { useDictStore } from 'store'
import { BaseTable, Box, Button, ButtonGroup, MRT_PaginationState, Tooltip } from 'ui'
import { dictsTransform, toastSuccess, toastWarn } from 'utils'

import DelButton from '@/component/delButton'
import Refresh from '@/component/refreshIcon'

import AddDialog from './components/add'
import EditDialog from './components/edit'
import InfoDialog from './components/info'

const isVehicleOnline = (row: any) => row.heart > 0 && row.errorCode === 0

const Vehicle = () => {
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<any[]>([])

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [row, setRow] = useState({})

  const { dicts } = useDictStore()

  const { data: chassisData } = useRequest(() => getChassisInfos({ type: 0 }))
  const { data: areaInfos } = useRequest(() => getAreaInfos())

  const _Dict = useMemo(() => {
    const obj: any = {},
      ary = ['ControlState', 'DeviceState', 'GoodsState', 'GraphGenus']
    console.log('dicts', dicts)
    ary.forEach((key: string) => {
      if (!dicts[key] || !dicts[key]?.length) return
      dicts[key]?.forEach((item: any) => {
        !obj[key] && (obj[key] = {})
        obj[key][item.value] = item.label
      })
    })
    return obj
  }, [dicts])
  console.log('🚀 ~ file: index.tsx ~ line 56 ~ const_Dict=useMemo ~ _Dict', _Dict)

  useAsyncEffect(async () => {
    await getTableData()
  }, [])

  const TaskColumn = [
    {
      accessorKey: 'loadWidth',
      id: 'loadWidth',
      header: '状态',
      Cell: ({ row }) => {
        const { errorCode, heart } = row?.original
        return (
          <div>
            {errorCode > 0 ? (
              <span style={{ color: 'red' }}>异常</span>
            ) : heart > 0 ? (
              <span style={{ color: 'white' }}>在线</span>
            ) : (
              <span style={{ color: '#9d9c9c' }}>离线</span>
            )}
          </div>
        )
      },
      size: 50
    },
    {
      accessorKey: 'id',
      id: 'id',
      header: '车辆编号',
      size: 50
    },
    {
      accessorKey: 'name',
      id: 'name',
      header: '车体名称',
      size: 50
    },
    {
      accessorKey: 'chassisType',
      id: 'chassisType',
      header: '车辆类型',
      size: 50
    },
    {
      accessorKey: 'carrierPos',
      id: 'carrierPos',
      header: '车辆位置',
      size: 220
    },
    {
      accessorKey: 'elecQuantity',
      id: 'elecQuantity',
      header: '当前电量（%）',
      size: 50
    },
    {
      accessorKey: 'routeType',
      id: 'routeType',
      header: '当前路径',
      Cell: ({ cell, row }: any) => {
        return (
          <div>
            {_Dict['GraphGenus'][cell.getValue()]} {' - '}
            {row?.original?.currentRoute}
          </div>
        )
      },
      size: 70
    },
    {
      accessorKey: 'controlState',
      id: 'controlState',
      header: '控制状态',
      Cell: ({ cell }: any) => {
        return <div>{_Dict['ControlState'][cell.getValue()]}</div>
      },
      size: 70
    },
    {
      accessorKey: 'goodsStatus',
      id: 'goodsStatus',
      header: '载货状态',
      Cell: ({ cell }: any) => {
        return <div>{_Dict['GoodsState'][cell.getValue()]}</div>
      },
      size: 70
    },
    {
      accessorKey: 'ip',
      id: 'ip',
      header: '交管车辆',
      Cell: ({ row }: any) => {
        return <div>{row?.original?.trafficControlCar || '无'}</div>
      },
      size: 120
    },
    {
      accessorKey: 'currentTask',
      id: 'currentTask',
      header: '当前任务',
      size: 120,
      Cell: ({ row }) => {
        return (
          <Tooltip title={row.original.currentTask} placement="top">
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '120px'
              }}
            >
              {row.original.currentTask}
            </div>
          </Tooltip>
        )
      }
    },
    {
      accessorKey: 'isLockdown',
      id: 'isLockdown',
      header: '锁定状态',
      Cell: ({ cell }: any) => {
        return <div>{!cell.getValue() ? '锁定' : '未锁定'}</div>
      },
      size: 50
    },
    {
      accessorKey: 'carrierState',
      id: 'carrierState',
      header: '急停状态',
      Cell: ({ cell }: any) => {
        return <div>{_Dict['DeviceState'][cell.getValue()]}</div>
      },
      size: 50
    },
    {
      accessorKey: 'actions',
      header: '操作',
      enableColumnFilter: false,
      enableSorting: false,
      Cell: ({ row, table }) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="text"
              size="small"
              sx={{
                paddingX: 0.5,
                minWidth: 36
              }}
              onClick={async () => {
                setEditOpen(true)
                const id = row?.original?.id
                const { data } = await postGetCarrierInfo(id)
                setRow(data)
              }}
            >
              配置
            </Button>
            /
            <Button
              color="warning"
              variant="text"
              size="small"
              sx={{
                paddingX: 0.5,
                minWidth: 36
              }}
              onClick={async () => {
                const id = row?.original?.id
                const { msg } = await postRemoveCarrier({ id })
                RcsMessage.success(msg)
                getTableData()
              }}
            >
              踢出
            </Button>
            /
            <DelButton
              color="error"
              variant="text"
              size="small"
              sx={{
                paddingX: 0.5,
                minWidth: 36
              }}
              delFn={async () => {
                const id = row?.original?.id
                await delCreateCarrier(id)
                RcsMessage.success()
                table.resetRowSelection()
                getTableData()
              }}
              startIcon={null}
            >
              删除
            </DelButton>
            /
            <Button
              color="success"
              variant="text"
              size="small"
              sx={{
                paddingX: 0.5,
                minWidth: 36
              }}
              onClick={async () => {
                const id = row?.original?.id
                const { msg } = await getSimulationCarrierLogin(id)
                RcsMessage.success(msg)
                getTableData()
              }}
            >
              激活
            </Button>
          </div>
        )
      }
    }
  ]

  const getInitTableData = () => {
    const hash: Record<string, any> = {}
    TaskColumn.forEach((column) => {
      hash[column.accessorKey] = '-'
    })
    return hash
  }

  const [paginationState, setPaginationState] = useState<MRT_PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [rowCount, setRowCount] = useState(0)
  const getTableData = async () => {
    setLoading(true)
    const fn = [postGetControlOptions({}), postGetControlStates({})]
    const all: any = Promise.all(fn.map((promise) => promise.catch(() => {})))
    const [options = { data: [] }, states = { data: [] }] = await all
    setRowCount(options?.data.length)
    const max = Math.max(...[options?.data.length, states?.data.length])
    let index = -1
    const initHash = getInitTableData()
    const hashMap: Record<string, any> = {}

    while (index < max - 1) {
      index++
      const optionsId = options?.data[index]?.id
      const statesId = states?.data[index]?.id

      optionsId &&
        (hashMap[optionsId] = hashMap[optionsId]
          ? { ...hashMap[optionsId], ...options?.data[index] }
          : { ...initHash, ...options?.data[index] })
      statesId &&
        (hashMap[statesId] = hashMap[statesId]
          ? { ...hashMap[statesId], ...states?.data[index] }
          : { ...initHash, ...states?.data[index] })
    }
    setTableData(Object.values(hashMap))
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const currentPageTableData = useMemo(
    () =>
      tableData
        .sort((a, b) => {
          if (!isVehicleOnline(a) && isVehicleOnline(b)) return 1
          else return -1
        })
        .slice(
          paginationState.pageIndex * paginationState.pageSize,
          (paginationState.pageIndex + 1) * paginationState.pageSize
        ),
    [paginationState, tableData]
  )

  const RcsMessage = {
    success: (msg?: string) => {
      toastSuccess(msg || `操作成功`)
    }
  }
  // 锁车0 解锁1
  const updateCarrierState = async (table: any, status: 0 | 1) => {
    if (table.getSelectedRowModel().rows.length === 0) {
      toastWarn('请选择一条数据')
      return
    }
    const rows = table.getSelectedRowModel().rows
    const promises: (() => Promise<any>)[] = []
    rows.forEach((row: any) => {
      promises.push(() => postUpdateCarrierState({ carId: row?.original?.id, key: status }))
    })
    // await postUpdateCarrierState({ carId: row?.original?.id, key: status })
    Promise.all(promises.map((p) => p())).then(() => {
      RcsMessage.success()
    })
    table.resetRowSelection()
  }
  // 急停 1急停 0解除
  const sendRemoteStop = async (table: any, status: 0 | 1) => {
    if (table.getSelectedRowModel().rows.length === 0) {
      toastWarn('请选择一条数据')
      return
    }
    const rows = table.getSelectedRowModel().rows
    const promises: (() => Promise<any>)[] = []
    rows.forEach((row: any) => {
      promises.push(() => postSendRemoteStop({ vehicle: row?.original?.id, remoteStop: status }))
    })
    // await postSendRemoteStop({ carId: row?.original?.id, key: status })
    Promise.all(promises.map((p) => p())).then(() => {
      RcsMessage.success()
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BaseTable
        columns={TaskColumn}
        data={currentPageTableData || []}
        muiTablePaperProps={{
          sx: {
            height: '100%',
            padding: 2
          }
        }}
        loading={loading}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: '4px'
              }}
            >
              <Button
                variant="outlined"
                size="small"
                color="warning"
                onClick={() => {
                  table.resetRowSelection()
                  getTableData()
                }}
              >
                <Refresh loading={loading}></Refresh>
                刷新
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                  setAddOpen(true)
                }}
              >
                <AddIcon />
                新增
              </Button>
              <ButtonGroup variant="outlined">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    updateCarrierState(table, 0)
                  }}
                >
                  {'锁定'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    updateCarrierState(table, 1)
                  }}
                >
                  {'解锁'}
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="outlined">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    sendRemoteStop(table, 1)
                  }}
                >
                  {'急停'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    sendRemoteStop(table, 0)
                  }}
                >
                  {'解除'}
                </Button>
              </ButtonGroup>
            </Box>
          )
        }}
        initialState={{
          columnPinning: {
            right: ['actions']
          }
        }}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableColumnActions={false}
        enableRowSelection={true}
        muiTableBodyCellProps={({ row }) => ({
          onDoubleClick: async () => {
            const id = row?.original?.id
            const { data } = await postGetCarrierInfo(id)
            setRow({ ...row?.original, ...data })
            setInfoOpen(true)
          }
        })}
        muiTableContainerProps={{
          sx: {
            maxHeight: '85%'
          }
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: '1rem 0.5rem'
          }
        }}
        enableStickyHeader
        state={{
          pagination: { ...paginationState }
        }}
        onPaginationChange={(updater) => {
          setPaginationState(updater)
        }}
        rowCount={rowCount}
        manualPagination
      />
      <AddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        callback={() => {
          RcsMessage.success()
          // table.resetRowSelection();
          getTableData()
        }}
        vehicleTypeOptions={dictsTransform(chassisData?.data, 'model', 'id')}
        areaInfosOptions={dictsTransform(areaInfos?.data, 'areaName', 'id')}
      />
      <EditDialog
        open={editOpen}
        row={row}
        onClose={() => setEditOpen(false)}
        callback={() => {
          RcsMessage.success()
          // table.resetRowSelection();
          getTableData()
        }}
        vehicleTypeOptions={dictsTransform(chassisData?.data, 'model', 'id')}
        areaInfosOptions={dictsTransform(areaInfos?.data, 'areaName', 'id')}
      />
      <InfoDialog open={infoOpen} row={row} onClose={() => setInfoOpen(false)}></InfoDialog>
    </>
  )
}

export default Vehicle

// import AddIcon from '@mui/icons-material/Add'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRequest } from 'ahooks'
import { getAreaInfos, GetCarrierOptions, GetChassisList, getStationInfoById, getStationInfos, getVertexs } from 'apis'
import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { useDictStore } from 'store'
import { BaseTable, Box, Button, MenuItem, TextField } from 'ui'
import { getUpperCaseKeyObject } from 'utils'

// import DelButton from '@/component/delButton'
import Refresh from '@/component/refreshIcon'

// import AddDialog from './components/add'
import EditDialog from './components/edit'

interface IProps {
  children?: ReactNode
}

const dictsTransform = (arr: [], label: string, value: string) => {
  if (!arr) {
    return []
  }
  return arr.map((item) => ({
    label: String(item[label]),
    value: item[value]
  }))
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  const { dicts } = useDictStore()
  // const [open, setOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [row, setRow] = React.useState({})
  const { data: chassisData, loading, run: getChass } = useRequest(() => getStationInfos({ type: 0 }))

  // const { runAsync: delFn } = useRequest(delStationInfos, {
  //   manual: true
  // })

  const { data: vertexData } = useRequest(() => getVertexs())
  const { data: areaInfos } = useRequest(() => getAreaInfos())

  const { data: carrierData } = useRequest(GetCarrierOptions)
  const { data: chassisList } = useRequest(GetChassisList)

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'pointKey',
      header: '路径编号'
    },

    {
      accessorKey: 'name',
      header: '名称'
    },
    {
      accessorKey: 'type',
      header: '站点类型',
      Filter: ({ header }) => {
        return (
          <TextField
            fullWidth
            margin="none"
            onChange={(e) => header.column.setFilterValue(e.target.value || undefined)}
            placeholder="Filter"
            select
            value={header.column.getFilterValue() ?? ''}
            variant="standard"
          >
            {/*@ts-ignore*/}
            {dicts.StationType?.map((item) => {
              return <MenuItem value={item.value}>{item.label}</MenuItem>
            })}
          </TextField>
        )
      },
      filterFn: (row, _columnIds, filterValue) => {
        return row.getValue<string>('type') === filterValue
      },
      Cell: ({ row }) => {
        const { original } = row
        const tyles = dicts.StationType?.find((item: any) => item.value === original.type)
        return <>{tyles?.label || ''}</>
      }
    },

    {
      accessorKey: 'priority',
      header: '优先级'
    },

    {
      accessorKey: 'carrierType',
      header: '车辆类型',
      Cell: ({ row }) => {
        const { original } = row
        const tyles = chassisList?.data?.find((item: any) => item.id === original.carrierType)
        return <>{tyles?.model || '全部'}</>
      }
    },
    {
      accessorKey: 'homeGroup',
      header: '待命点分组'
    },
    {
      accessorKey: 'homeGroupPriority',
      enableColumnFilter: false,
      header: '待命点优先级'
    },
    {
      accessorKey: 'homeGroupType',
      header: '待命点类型'
    },
    {
      accessorKey: 'actions',
      header: '操作',
      enableColumnFilter: false,
      enableSorting: false,
      Cell: ({ row }) => {
        return (
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '0.5rem',
              width: '100px'
            }}
          >
            <Button
              component="label"
              size="small"
              color="warning"
              onClick={async () => {
                setEditOpen(true)
                const stationInfos = await getStationInfoById({ id: row.original.id })
                setRow(stationInfos.data)
              }}
              startIcon={<EditNoteIcon />}
            >
              修改
            </Button>
            {/* <DelButton
              delFn={async () => {
                await delFn({
                  id: row.original.id
                })
                getChass()
              }}
            /> */}
          </div>
        )
      }
    }
  ]

  return (
    <>
      <BaseTable
        columns={columns}
        data={chassisData?.data.data || []}
        muiTablePaperProps={{
          sx: {
            height: '100%',
            padding: 2
          }
        }}
        loading={loading}
        renderTopToolbarCustomActions={() => {
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
                  getChass()
                }}
              >
                <Refresh loading={loading}></Refresh>
                刷新
              </Button>
              {/* <Button variant="outlined" size="small" color="primary" onClick={() => setOpen(true)}>
                <AddIcon />
                新增
              </Button> */}
            </Box>
          )
        }}
        initialState={{
          columnPinning: {
            right: ['actions']
          }
        }}
        enableToolbarInternalActions={true}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableColumnActions={false}
      />
      {/* <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        vertexData={dictsTransform(vertexData?.data, 'id', 'id')}
        carrierData={dictsTransform(carrierData?.data, 'name', 'id')}
        chassisList={dictsTransform(chassisList?.data, 'model', 'id')}
        callback={() => {
          getChass()
        }}
      /> */}
      <EditDialog
        open={editOpen}
        row={getUpperCaseKeyObject(row)}
        onClose={() => setEditOpen(false)}
        areaInfos={dictsTransform(areaInfos?.data, 'areaName', 'id')}
        vertexData={dictsTransform(vertexData?.data, 'id', 'id')}
        carrierData={dictsTransform(carrierData?.data, 'name', 'id')}
        chassisList={dictsTransform(chassisList?.data, 'model', 'id')}
        callback={() => getChass()}
      />
    </>
  )
}

export default memo(VehicleType)

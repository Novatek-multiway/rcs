// import AddIcon from '@mui/icons-material/Add'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useVoerkaI18n } from '@voerkai18n/react'
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
  const { t } = useVoerkaI18n()
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
      header: 'ID',
      size: 100
    },
    {
      accessorKey: 'pointKey',
      header: t('路径编号'),
      size: 100
    },

    {
      accessorKey: 'name',
      header: t('名称'),
      size: 100
    },
    {
      accessorKey: 'type',
      header: t('站点类型'),
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
      },
      size: 100
    },

    {
      accessorKey: 'priority',
      header: t('优先级'),
      size: 100
    },

    {
      accessorKey: 'carrierType',
      header: t('车辆类型'),
      Cell: ({ row }) => {
        const { original } = row
        const tyles = chassisList?.data?.find((item: any) => item.id === original.carrierType)
        return <>{tyles?.model || t('全部')}</>
      }
    },
    {
      accessorKey: 'homeGroup',
      header: t('待命点分组'),
      size: 100
    },
    {
      accessorKey: 'homeGroupPriority',
      enableColumnFilter: false,
      header: t('待命点优先级'),
      size: 100
    },
    {
      accessorKey: 'homeGroupType',
      header: t('待命点类型'),
      size: 100
    },
    {
      accessorKey: 'actions',
      header: t('操作'),
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
                const stationInfos = await getStationInfoById({
                  id: row.original.id
                })
                setRow(stationInfos.data)
                setEditOpen(true)
              }}
              startIcon={<EditNoteIcon />}
            >
              {t('修改')}
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
      },
      size: 100
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
                {t('刷新')}
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
        muiTableContainerProps={{
          sx: {
            maxHeight: '85%'
          }
        }}
        enableStickyHeader
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

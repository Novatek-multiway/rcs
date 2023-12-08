import AddIcon from '@mui/icons-material/Add'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRequest } from 'ahooks'
import { ChangeActive, DeleteRouteFileInfo, GetChassisList, GetMapOptionPageList, GetRuleControlStates } from 'apis'
import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { BaseTable, Box, Button, Switch, Tooltip } from 'ui'

import DelButton from '@/component/delButton'
import Refresh from '@/component/refreshIcon'

import AddDialog from './components/add'
import EditDialog from './components/edit'
import ImportDialog from './components/import'

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

//事件配置
const MapPage: FC<IProps> = () => {
  const [open, setOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [openImport, setOpenImport] = React.useState(false)
  const [row, setRow] = React.useState({})
  const { data: chassisData, loading, run: getChass } = useRequest(() => GetMapOptionPageList({ id: 0 }))

  const { runAsync: delFn } = useRequest(DeleteRouteFileInfo, {
    manual: true
  })
  const { data: controlStates } = useRequest(GetRuleControlStates)

  const { runAsync: changeFn, loading: changeActiveLoading } = useRequest(ChangeActive, {
    manual: true,
    onSuccess: () => {
      getChass()
    }
  })

  const { data: chassisList } = useRequest(GetChassisList)

  const convertChassisList = [{ label: '全部', value: 0 }].concat(...dictsTransform(chassisList?.data, 'model', 'id'))
  const carsList = [{ label: '全部', value: 0 }].concat(dictsTransform(controlStates?.data, 'id', 'id'))

  const columns = [
    {
      accessorKey: 'id',
      header: '编号',
      size: 55
    },
    {
      accessorKey: 'projectName',
      header: '项目名称',
      size: 100
    },
    {
      accessorKey: 'routeName',
      header: '地图名称',
      size: 100
    },
    {
      accessorKey: 'mapChassis',
      header: '适用车辆',
      Cell: ({ row }) => {
        const { original } = row
        const tyles = carsList?.find((item) => item.value === original.mapChassis)
        return <>{tyles?.label || 'All'}</>
      },
      size: 50
    },
    {
      accessorKey: 'mapCarrier',
      header: '适用车型',
      Cell: ({ row }) => {
        const { original } = row
        const tyles = convertChassisList?.find((item) => item.value === Number(original.mapCarrier))
        return <>{tyles?.label || 'All'}</>
      },
      size: 50
    },
    {
      accessorKey: 'guid',
      header: '地图GUID',
      size: 100,
      Cell: ({ row }) => {
        return (
          <Tooltip title={row.original.guid} placement="top">
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '70px'
              }}
            >
              {row.original.guid}
            </div>
          </Tooltip>
        )
      }
    },
    {
      accessorKey: 'revision',
      enableColumnFilter: false,
      header: '版本号',
      size: 60
    },
    {
      accessorKey: 'routeFile',
      header: '路径文件名称',
      size: 120
    },
    {
      accessorKey: 'dwgFile',
      header: '地图Dxf文件名',
      size: 120
    },
    {
      accessorKey: 'isActive',
      header: '是否激活',
      Cell: ({ row }) => {
        return (
          <>
            <Switch
              checked={row.original.isActive}
              onChange={async () =>
                await changeFn({
                  id: row.original.id,
                  isActive: !row.original.isActive
                })
              }
            />
          </>
        )
      },
      size: 60
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
              onClick={() => {
                setEditOpen(true)
                setRow(row.original)
              }}
              startIcon={<EditNoteIcon />}
            >
              修改
            </Button>
            <DelButton
              delFn={async () => {
                await delFn({
                  id: row.original.id
                })
                getChass()
              }}
            />
          </div>
        )
      },
      size: 175
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
        loading={loading || changeActiveLoading}
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
              <Button variant="outlined" size="small" color="primary" onClick={() => setOpen(true)}>
                <AddIcon />
                新增路径文件
              </Button>
              {/* <Button variant="outlined" size="small" color="success" onClick={() => setOpenImport(true)}>
                <AddIcon />
                上传底图文件
              </Button> */}
            </Box>
          )
        }}
        initialState={{
          columnPinning: {
            right: ['isActive', 'actions']
          }
        }}
        enableToolbarInternalActions={true}
        enableFullScreenToggle={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableColumnActions={false}
        enableColumnFilters={false}
      />
      <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        carrierData={convertChassisList}
        controlStates={carsList}
        callback={() => {
          getChass()
        }}
      />
      <EditDialog
        open={editOpen}
        row={row}
        onClose={() => setEditOpen(false)}
        carrierData={convertChassisList}
        controlStates={carsList}
        callback={() => {
          getChass()
        }}
      />
      <ImportDialog open={openImport} onClose={() => setOpenImport(false)} />
    </>
  )
}

export default memo(MapPage)

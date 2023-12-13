import EditNoteIcon from '@mui/icons-material/EditNote'
import EuroIcon from '@mui/icons-material/Euro'
import { useRequest } from 'ahooks'
import { GetRuleChassisInfos, postCarrierInfoPageList } from 'apis'
import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { BaseTable, Box, Button, Chip } from 'ui'
// import { useDictStore } from "store";
import { dictsTransform } from 'utils'

import Refresh from '@/component/refreshIcon'

import ConfigDialog from './components/config'

interface IProps {
  children?: ReactNode
}

// 车型配置
const StandByPoint: FC<IProps> = () => {
  const [editOpen, setEditOpen] = React.useState(false)
  const [row, setRow] = React.useState({})
  const { data: chassisData, loading, run: getChass } = useRequest(() => postCarrierInfoPageList({ type: 0 }))

  const { data: ruleCarrierData } = useRequest(GetRuleChassisInfos)

  const columns = [
    {
      accessorKey: 'id',
      header: '车辆编号'
    },
    {
      accessorKey: 'name',
      header: '车体名称'
    },
    {
      accessorKey: 'type',
      header: '车辆类型',
      Cell: ({ row }) => {
        const { original } = row
        const tyles = dictsTransform(ruleCarrierData?.data, 'model', 'type')?.find(
          (item) => item.value === original.type
        )
        return (
          <>
            {tyles?.label ? (
              <Chip
                size="small"
                // avatar={<Avatar></Avatar>}
                color="primary"
                variant="outlined"
                icon={<EuroIcon />}
                label={tyles?.label}
              />
            ) : (
              ''
            )}
          </>
        )
      }
    },
    {
      accessorKey: 'homePoint',
      header: '待命点位置'
    },
    {
      accessorKey: 'isAutoReHome',
      header: '是否回待命点',
      Cell: ({ row }) => {
        return row.original.isAutoReHome ? '是' : '否'
      }
    },
    {
      accessorKey: 'actions',
      header: '操作',
      enableColumnFilter: false,
      enableSorting: false,
      size: 50,
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
              配置
            </Button>
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
        enableColumnFilters={false}
      />
      <ConfigDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        rows={row}
        callback={() => {
          getChass()
        }}
      />
    </>
  )
}

export default memo(StandByPoint)

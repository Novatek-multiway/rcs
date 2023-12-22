import EditNoteIcon from '@mui/icons-material/EditNote'
import EuroIcon from '@mui/icons-material/Euro'
import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest } from 'ahooks'
import { postCarrierInfoPageList } from 'apis'
import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'
import { useDictStore } from 'store'
import { BaseTable, Box, Button, Chip } from 'ui'

// import { useDictStore } from "store";
import Refresh from '@/component/refreshIcon'

import ConfigDialog from './components/config'

interface IProps {
  children?: ReactNode
}

// 车型配置
const StandByPoint: FC<IProps> = () => {
  const { t } = useVoerkaI18n()
  const [editOpen, setEditOpen] = React.useState(false)
  const [row, setRow] = React.useState({})
  const { data: chassisData, loading, run: getChass } = useRequest(() => postCarrierInfoPageList({ type: 0 }))

  const { dicts } = useDictStore()

  const columns = [
    {
      accessorKey: 'id',
      header: t('车辆编号')
    },
    {
      accessorKey: 'name',
      header: t('车体名称')
    },
    {
      accessorKey: 'type',
      header: t('车辆类型'),
      Cell: ({ row }) => {
        const { original } = row
        const carrierType = dicts.CarrierType?.find((item) => item.value === original.type)
        return (
          <>
            {carrierType?.label ? (
              <Chip
                size="small"
                // avatar={<Avatar></Avatar>}
                color="primary"
                variant="outlined"
                icon={<EuroIcon />}
                label={carrierType?.label}
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
      header: t('待命点位置')
    },
    {
      accessorKey: 'isAutoReHome',
      header: t('是否回待命点'),
      Cell: ({ row }) => {
        return row.original.isAutoReHome ? t('是') : <span style={{ opacity: 0.5 }}>{t('否')}</span>
      }
    },
    {
      accessorKey: 'actions',
      header: t('操作'),
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
              {t('配置')}
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
                {t('刷新')}
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

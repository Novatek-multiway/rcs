import AddIcon from '@mui/icons-material/Add'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRequest, useUpdateEffect } from 'ahooks'
import { delChassisInfos, getChassisInfos } from 'apis'
import type { FC, ReactNode } from 'react'
import React, { memo, useMemo, useState } from 'react'
import { useDictStore } from 'store'
import { BaseTable, Box, Button } from 'ui'

import DelButton from '@/component/delButton'
import Refresh from '@/component/refreshIcon'

import AddDialog from './components/add'
import EditDialog from './components/edit'

interface IProps {
  children?: ReactNode
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  const { dicts } = useDictStore()
  const [open, setOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [row, setRow] = React.useState({})
  const [page, setPage] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const [rowCount, setRowCount] = useState(0)

  const { data: chassisData, loading, run: getChass } = useRequest(() => getChassisInfos({ type: 0 }))

  useUpdateEffect(() => {
    setRowCount(chassisData?.data.length)
  }, [chassisData])

  const currentPageTableData = useMemo(
    () => chassisData?.data?.slice?.(page.pageIndex * page.pageSize, (page.pageIndex + 1) * page.pageSize) || [],
    [page, chassisData]
  )

  const { runAsync: delFn } = useRequest(delChassisInfos, {
    manual: true
  })

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 80
    },
    {
      accessorKey: 'type',
      header: '类型',
      Cell: ({ row }) => {
        const { original } = row
        const tyles = dicts.CarrierType?.find((item) => item.value === original.type)
        return <>{tyles?.label || ''}</>
      },
      size: 80
    },
    {
      accessorKey: 'model',
      header: '名称',
      size: 120
    },
    {
      accessorKey: 'forcedCharge',
      header: '强制充电电量',
      size: 80
    },
    {
      accessorKey: 'noLoadOffsetX',
      header: '空载偏移X',
      size: 80
    },
    {
      accessorKey: 'noLoadOffsetY',
      header: '空载偏移Y',
      size: 80
    },
    {
      accessorKey: 'noLoadWidth',
      header: '空载车宽',
      size: 80
    },
    {
      accessorKey: 'noLoadLength',
      header: '空载车长',
      size: 80
    },
    {
      accessorKey: 'chassisModel',
      header: '模型文件',
      size: 140
    },
    {
      accessorKey: 'actions',
      header: '操作',
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
                const x2 = (row.original.noLoadOffsetX * 2 + row.original.noLoadLength) / 2
                const x1 = x2 - row.original.noLoadLength
                const y2 = (row.original.noLoadOffsetY * 2 + row.original.noLoadWidth) / 2
                const y1 = y2 - row.original.noLoadWidth
                setRow({
                  ...row.original,
                  x1,
                  x2,
                  y1,
                  y2
                })
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
      size: 160
    }
  ]

  return (
    <>
      <BaseTable
        columns={columns}
        data={currentPageTableData}
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
              <Button variant="outlined" size="small" color="primary" onClick={() => setOpen(true)}>
                <AddIcon />
                新增
              </Button>
            </Box>
          )
        }}
        initialState={{
          columnPinning: {
            right: ['actions']
          }
        }}
        state={{
          pagination: page
        }}
        rowCount={rowCount}
        onPaginationChange={(page) => {
          setPage(page)
        }}
        manualPagination
      />
      <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        callback={() => {
          getChass()
        }}
      />
      <EditDialog open={editOpen} row={row} onClose={() => setEditOpen(false)} callback={() => getChass()} />
    </>
  )
}

export default memo(VehicleType)

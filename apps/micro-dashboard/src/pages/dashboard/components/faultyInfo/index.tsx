import { useVoerkaI18n } from '@voerkai18n/react'
import { useAsyncEffect, useUpdateEffect } from 'ahooks'
import { getAgvAbnormal } from 'apis'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useMemo, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { MaterialReactTable, MRT_ColumnDef, Panel, useMaterialReactTable } from 'ui'

import { useWebsocketStore } from '../../store/websocket'

type FaultyInfoItem = {
  vehicleId: number
  errorCode: number
  errorDesc: string
}

interface IFaultyInfoProps {}

const ERROR_COLOR = 'rgba(247, 86, 79, 0.7)'

const FaultyInfoTable = memo((props: { data: FaultyInfoItem[]; maxHeight?: number }) => {
  const { data, maxHeight } = props
  const { t, activeLanguage } = useVoerkaI18n()
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<FaultyInfoItem>[]>(
    () => [
      {
        accessorKey: 'vehicleId', //access nested data with dot notation
        header: t('车体名称'),
        size: 50
      },
      {
        accessorKey: 'errorCode',
        header: t('异常码'),
        size: 50
      },
      {
        accessorKey: 'errorDesc', //normal accessorKey
        header: t('异常明细'),
        size: 100
      }
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeLanguage]
  )
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableStickyHeader: true,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: 'none'
      }
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: maxHeight + 'px',
        height: '100%'
      }
    },
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd) > td': {
          backgroundColor: 'rgb(26, 29, 36)'
        },
        '& tr:nth-of-type(even) > td': {
          backgroundColor: 'transparent'
        },
        '& td:nth-of-type(2)': {
          color: 'rgb(255, 180, 88)'
        },
        '& td:nth-of-type(3)': {
          color: ERROR_COLOR
        }
      }
    },
    muiTableHeadCellProps: {
      sx: {
        border: 'none',
        padding: '6px 2px !important',
        fontSize: '13px',
        background: 'rgb(36, 38, 47)',
        textAlign: 'center',
        '.Mui-TableHeadCell-Content-Labels, .Mui-TableHeadCell-Content-Wrapper': {
          width: '100%'
        }
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border: 'none',
        padding: '6px 2px',
        fontSize: '13px',
        textAlign: 'center'
      }
    }
  })

  return <MaterialReactTable table={table} />
})

const FaultyInfo: FC<PropsWithChildren<IFaultyInfoProps>> = () => {
  const { t } = useVoerkaI18n()
  const wsCarrierAbnormalData = useWebsocketStore((state) => state['Report/GetCarrierAbnormal'])
  const [faultyInfoData, setFaultyInfoData] = useState<ReportAPI.AbnormalCarrier[]>([])

  useAsyncEffect(async () => {
    const res = await getAgvAbnormal()
    const newFaultyInfoData = res.data as ReportAPI.AbnormalCarrier[]
    setFaultyInfoData(newFaultyInfoData)
  }, [])

  useUpdateEffect(() => {
    setFaultyInfoData(wsCarrierAbnormalData || [])
  }, [wsCarrierAbnormalData])
  return (
    <Panel
      title={t('异常信息')}
      wrapperStyle={{
        height: '35%'
      }}
    >
      <AutoSizer defaultHeight={218}>
        {({ width, height }) => (
          <div style={{ width, height }}>
            <FaultyInfoTable
              data={faultyInfoData.map((d) => ({
                vehicleId: d.carrier,
                errorCode: d.errorCode,
                errorDesc: d.errorDesc
              }))}
              maxHeight={height}
            />
          </div>
        )}
      </AutoSizer>
    </Panel>
  )
}

export default memo(FaultyInfo)

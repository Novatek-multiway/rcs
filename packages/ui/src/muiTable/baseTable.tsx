import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData, //default shape of TData (Record<string, any>)
  type MRT_TableOptions,
  useMaterialReactTable
} from 'material-react-table'
import { useEffect, useState } from 'react'

import { mRTL, mRTLEmitter } from './localization'
interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
  columns: MRT_ColumnDef<TData, any>[]
  data: TData[]
  loading?: boolean
}
export const BaseTable = <TData extends MRT_RowData>(props: Props<TData>) => {
  const { data, columns, loading, ...rest } = props
  const [currentMRTL, setCurrentMRTL] = useState(mRTL)
  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: loading
    },
    muiTablePaperProps: {
      sx: {
        height: '100%',
        padding: 2
      }
    },
    enableToolbarInternalActions: false,
    enableColumnActions: false,
    localization: currentMRTL,

    //your custom table options...
    ...rest //accept props to override default table options
  })

  useEffect(() => {
    mRTLEmitter.subscribe((mRTL) => {
      setCurrentMRTL(mRTL)
    })
  }, [])

  return <MaterialReactTable table={table} />
}

import { MaterialReactTable, type MRT_ColumnDef, MRT_TableOptions } from 'material-react-table'
import React, { FC, useEffect, useState } from 'react'

import { mRTL, mRTLEmitter } from './localization'

interface TableProps extends MRT_TableOptions<Record<any, any>> {
  data: any[]
  columns: MRT_ColumnDef<Record<any, any>>[]
  pageChange?: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number
      pageSize: number
    }>
  >
}
export const MuiTable: FC<TableProps> = (props) => {
  const { data, columns, pageChange, ...rest } = props
  console.log(data)
  const [currentMRTL, setCurrentMRTL] = useState(mRTL)

  useEffect(() => {
    mRTLEmitter.subscribe((mRTL) => {
      setCurrentMRTL(mRTL)
    })
  }, [])

  return (
    <>
      <MaterialReactTable
        data={data}
        columns={columns}
        enableRowSelection
        onPaginationChange={pageChange}
        manualPagination={true}
        localization={currentMRTL}
        // enableColumnResizing
        enableColumnFilters={false}
        enableFilters={false}
        enableSorting={false}
        initialState={{
          density: 'compact'
        }}
        // rowCount={data.length}
        {...rest}
      />
    </>
  )
}

export * from 'material-react-table'

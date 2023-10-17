import { Paper } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { useUpdateEffect } from 'ahooks'
import React, { FC, useState } from 'react'

import Empty from '../empty'

interface DynamicDataGridProps {
  apiFunction: (a: any) => Promise<any>
  columns: GridColDef[]
  paginationModel?: GridPaginationModel
  onPageChange?: (newPage: number) => void
  loading?: boolean
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#1A2027' : 'none',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: '400px'
}))

const StyledDataGrid: Theme = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.85)'
  },
  '& .MuiButtonBase-root': {
    color: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.85)'
  },
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d'
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  }
}))

const DynamicDataGrid: FC<DynamicDataGridProps> = ({ apiFunction, columns, loading }) => {
  const [rows, setRows] = useState<any[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [sendPage, setPage] = useState<GridPaginationModel>({ page: 0, pageSize: 10 })

  useUpdateEffect(() => {
    const fetchData = async () => {
      try {
        const { page, pageSize } = sendPage
        const SkipCount = page * pageSize,
          MaxResultCount = pageSize

        const response = await apiFunction({ SkipCount, MaxResultCount })
        setRows(response.Result.Items)
        setTotalRows(response.Result.TotalCount)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [sendPage])

  const handlePageChange = (params: GridPaginationModel) => {
    setPage({ page: params.page, pageSize: params.pageSize })
  }

  return (
    <StyledPaper>
      <StyledDataGrid
        loading={loading}
        slots={{ noRowsOverlay: Empty }}
        sx={{ '--DataGrid-overlayHeight': '300px' }}
        rows={rows}
        columns={columns}
        getRowId={(row: any) => row.Id}
        rowCount={totalRows}
        pagination
        pageSizeOptions={[5, 10, 25]}
        autoPageSize
        paginationModel={sendPage}
        paginationMode="server"
        onPaginationModelChange={handlePageChange}
        disableRowSelectionOnClick
        // autoHeight
        localeText={{
          columnMenuSortAsc: '升序',
          columnMenuSortDesc: '降序',
          columnMenuFilter: '筛选',
          columnMenuHideColumn: '隐藏列',
          columnMenuManageColumns: '管理列',
          columnMenuUnsort: '取消排序'
        }}
      />
    </StyledPaper>
  )
}

export default DynamicDataGrid

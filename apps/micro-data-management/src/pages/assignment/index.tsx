import AddIcon from '@mui/icons-material/Add'
import { useRequest, useUpdateEffect } from 'ahooks'
import { createTask, getTaskByGuid, postGTaskList } from 'apis'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Grid, MuiTable } from 'ui'

import Refresh from '@/component/refreshIcon'

import { ChildTaskColumn, TaskColumn, TaskPointsColumn } from './columns'
import AddTaskDialog from './component/addTaskDialog'

const DataTable = () => {
  const { loading, runAsync } = useRequest(postGTaskList, {
    manual: true
  })

  const [page, setPage] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  const [rowCount, setRowCount] = useState(0)
  const [taskGroupsData, setTaskGroupsData] = useState([])
  const [selectedTaskGroupData, setSelectedTaskGroupData] = useState({}) as any
  const [selectedTaskData, setSelectedTaskData] = useState([]) as any

  const [open, setOpen] = useState(false)

  const fetchTaskGroups = useCallback(async () => {
    const res = await runAsync({ ...page, pageIndex: page.pageIndex + 1, sortBy: 'CreateTime', order: 'desc' })
    if (res) {
      setTaskGroupsData(res.data.data)
      setRowCount(res.data.total)
    }
  }, [page, runAsync])

  useEffect(() => {
    fetchTaskGroups()
  }, [fetchTaskGroups])

  const [tasks, setTasks] = useState([])
  const fetchTasks = useCallback(async (taskGroupId: string) => {
    const res = await getTaskByGuid(taskGroupId)
    const tasks = res.data || []
    setTasks(tasks)
  }, [])

  useUpdateEffect(() => {
    fetchTasks(selectedTaskGroupData.orderCode)
  }, [fetchTasks, selectedTaskGroupData])

  const actionPoints = useCallback(() => {
    if (!selectedTaskGroupData.tasks) {
      return []
    }
    if (selectedTaskData.actionPoint?.length) {
      return selectedTaskData.actionPoint
    }

    if (selectedTaskGroupData?.tasks.length) {
      return selectedTaskGroupData.tasks[0].actionPoint
    }
    return []
  }, [selectedTaskGroupData, selectedTaskData])

  const handleSave = useCallback(
    async (data: any) => {
      await createTask(data)
      fetchTaskGroups()
      setOpen(false)
    },
    [fetchTaskGroups]
  )

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{ height: '100%' }}>
      <Grid
        xs={6}
        item
        sx={{
          overflow: 'auto'
        }}
      >
        {/* {taskGroupsData.length && ( */}
        <MuiTable
          columns={TaskColumn({
            refreshTable: () => {
              fetchTaskGroups()
              fetchTasks(selectedTaskGroupData.orderCode)
            }
          })}
          data={taskGroupsData}
          pageChange={(pages) => {
            setPage(pages)
            setSelectedTaskGroupData({})
          }}
          rowCount={rowCount}
          // enableColumnResizing
          defaultColumn={{
            minSize: 80,
            size: 100,
            maxSize: 200
          }}
          enableToolbarInternalActions={false}
          enableColumnActions={false}
          enableRowSelection={false}
          muiTableBodyRowProps={({ row }) => {
            return {
              sx: {
                cursor: 'pointer',
                backgroundColor: row.getValue('id') === selectedTaskGroupData.id ? '#1e4141' : '',
                opacity: row.original.isCancel ? 0.3 : 1
              },
              onClick: () => {
                setSelectedTaskGroupData(row.original)
              }
            }
          }}
          initialState={{
            columnPinning: {
              right: ['actions']
            }
          }}
          state={{
            isLoading: loading,
            showLoadingOverlay: false,
            showProgressBars: loading,
            pagination: { ...page },
            density: 'compact'
          }}
          muiTablePaperProps={{
            sx: {
              height: '100%',
              padding: 2
            }
          }}
          muiTableBodyProps={{
            sx: {
              overflow: 'auto'
            }
          }}
          muiTableHeadCellProps={{
            align: 'center'
          }}
          muiTableBodyCellProps={{
            align: 'center'
          }}
          muiTableContainerProps={{
            sx: {
              maxHeight: '75vh',
              overflow: 'scroll'
            }
          }}
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
                    setPage({
                      pageIndex: 0,
                      pageSize: 10
                    })
                    setSelectedTaskGroupData({})
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
        ></MuiTable>
        {/* )} */}
      </Grid>
      <Grid xs={6} item container rowSpacing={2}>
        <Grid item xs={12}>
          {/* {taskGroupsData.length && ( */}
          <MuiTable
            columns={ChildTaskColumn({ refreshTable: () => fetchTasks(selectedTaskGroupData.orderCode) })}
            data={tasks || []}
            // enableColumnResizing
            defaultColumn={{
              minSize: 100,
              size: 100,
              maxSize: 300
            }}
            enableRowSelection={false}
            enablePagination={false}
            enableColumnActions={false}
            enableTopToolbar={false}
            muiTableBodyRowProps={({ row }) => {
              return {
                sx: {
                  cursor: 'pointer'
                },
                onClick: () => {
                  setSelectedTaskData(row.original)
                }
              }
            }}
            initialState={{
              columnPinning: {
                right: ['actions']
              }
            }}
            state={{
              isLoading: loading,
              showLoadingOverlay: false,
              showProgressBars: loading,
              density: 'compact'
            }}
            muiTablePaperProps={{
              sx: {
                height: '100%',
                padding: 2
              }
            }}
            muiTableProps={{
              sx: {
                height: '100%'
              }
            }}
            muiTableBodyProps={{
              sx: {
                height: '100%',
                overflow: 'auto'
              }
            }}
          ></MuiTable>
          {/* )} */}
          {/* 新增区域 */}
        </Grid>
        <Grid item xs={12}>
          {/* {taskGroupsData.length && ( */}
          <MuiTable
            columns={TaskPointsColumn}
            data={actionPoints()}
            // enableColumnResizing
            // enableColumnResizing
            defaultColumn={{
              minSize: 100,
              size: 100,
              maxSize: 300
            }}
            enableRowSelection={false}
            enablePagination={false}
            enableToolbarInternalActions={false}
            enableColumnActions={false}
            initialState={{
              columnPinning: {
                right: ['actions']
              }
            }}
            state={{
              isLoading: loading,
              showLoadingOverlay: false,
              showProgressBars: loading,
              density: 'compact'
            }}
            muiTablePaperProps={{
              sx: {
                height: '100%',
                padding: 2
              }
            }}
            muiTableProps={{
              sx: {
                height: '100%'
              }
            }}
            muiTableBodyProps={{
              sx: {
                height: '100%',
                overflow: 'auto'
              }
            }}
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
                  <Button variant="outlined" size="small" color="primary">
                    <AddIcon />
                    添加任务点
                  </Button>
                </Box>
              )
            }}
          ></MuiTable>
          {/* )} */}
        </Grid>
      </Grid>
      <AddTaskDialog open={open} onClose={() => setOpen(false)} onSave={handleSave} />
    </Grid>
  )
}

export default DataTable

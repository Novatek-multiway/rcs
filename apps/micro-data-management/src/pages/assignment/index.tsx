import AddIcon from '@mui/icons-material/Add'
import { useRequest, useUpdateEffect } from 'ahooks'
import { addTaskPoint, createTask, getTaskByGuid, postGTaskList } from 'apis'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Grid, MuiTable } from 'ui'

import Refresh from '@/component/refreshIcon'

import { ChildTaskColumn, TaskColumn, TaskPointsColumn } from './columns'
import AddActionPointDialog from './component/addActionPointDialog'
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
  const [selectedTaskData, setSelectedTaskData] = useState({}) as any

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
  const fetchTasks = useCallback(
    async (taskGroupId: string) => {
      const res = await getTaskByGuid(taskGroupId)
      const tasks = res.data || []
      setTasks(tasks)
      const { taskCode } = selectedTaskData
      const newSelectedTaskData = tasks.find((item: any) => item.taskCode === taskCode)
      setSelectedTaskData(newSelectedTaskData)
    },
    [selectedTaskData]
  )

  useUpdateEffect(() => {
    fetchTasks(selectedTaskGroupData.orderCode)
  }, [selectedTaskGroupData])

  const taskActionPoints = useMemo(() => selectedTaskData?.actionPoint || [], [selectedTaskData])

  /* -------------------------------- 添加任务组的任务 -------------------------------- */
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false)
  const handleSaveTask = useCallback(
    async (data: any) => {
      await createTask(data)
      fetchTaskGroups()
      setAddTaskDialogOpen(false)
    },
    [fetchTaskGroups]
  )
  /* -------------------------------- 添加任务组的任务 -------------------------------- */

  /* -------------------------------- 给任务添加任务点 -------------------------------- */
  const [addActionPointDialogOpen, setAddActionPointDialogOpen] = useState(false)
  const handleSaveActionPoint = useCallback(
    async (data: any) => {
      await addTaskPoint({
        Guid: selectedTaskData.taskCode,
        Points: [data]
      })
      fetchTaskGroups()
      fetchTasks(selectedTaskGroupData.orderCode)
      setAddActionPointDialogOpen(false)
    },
    [selectedTaskData, fetchTasks, selectedTaskGroupData.orderCode, fetchTaskGroups]
  )
  /* -------------------------------- 给任务添加任务点 -------------------------------- */

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{ height: '100%', marginTop: 0 }}>
      <Grid
        xs={6}
        item
        sx={{
          overflow: 'auto'
        }}
      >
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
                setSelectedTaskData(row.original.tasks[0])
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
              maxHeight: '72vh',
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
                <Button variant="outlined" size="small" color="primary" onClick={() => setAddTaskDialogOpen(true)}>
                  <AddIcon />
                  新增
                </Button>
              </Box>
            )
          }}
        ></MuiTable>
        {/* )} */}
      </Grid>
      <Grid xs={6} item flexDirection={'column'} container rowSpacing={2}>
        <Grid item xs={6} sx={{ width: '100%', maxWidth: '100% !important' }}>
          <MuiTable
            columns={ChildTaskColumn({ refreshTable: () => fetchTasks(selectedTaskGroupData.orderCode) })}
            data={tasks || []}
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
                  cursor: 'pointer',
                  opacity: row.original.state === 5 ? 0.3 : 1
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
            muiTableContainerProps={{
              sx: {
                maxHeight: '30vh',
                overflow: 'scroll'
              }
            }}
          ></MuiTable>
          {/* 新增区域 */}
        </Grid>
        <Grid item xs={6} sx={{ width: '100%', maxWidth: '100% !important' }}>
          <MuiTable
            columns={TaskPointsColumn}
            data={taskActionPoints}
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
            muiTableContainerProps={{
              sx: {
                maxHeight: '40vh',
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
                    color="primary"
                    disabled={taskActionPoints.length === 0}
                    sx={{
                      lineHeight: 1
                    }}
                    onClick={() => setAddActionPointDialogOpen(true)}
                  >
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
      {addTaskDialogOpen && (
        <AddTaskDialog open={addTaskDialogOpen} onClose={() => setAddTaskDialogOpen(false)} onSave={handleSaveTask} />
      )}
      {addActionPointDialogOpen && (
        <AddActionPointDialog
          open={addActionPointDialogOpen}
          onClose={() => setAddActionPointDialogOpen(false)}
          onSave={handleSaveActionPoint}
        />
      )}
    </Grid>
  )
}

export default DataTable

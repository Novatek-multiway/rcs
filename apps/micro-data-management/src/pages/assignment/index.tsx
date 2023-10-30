import AddIcon from "@mui/icons-material/Add";
import { useAsyncEffect, useRequest } from "ahooks";
import { postGTaskList } from "apis";
import { useCallback, useState } from "react";
import * as React from "react";
import { Box, Button, Grid, MuiTable } from "ui";

import Refresh from "@/component/refreshIcon";

import { ChildTaskColumn, TaskColumn, TaskPointsColumn } from "./columns";
import AddTaskDialog from "./componen/addTaskDialog";

const DataTable = () => {
  const { loading, runAsync } = useRequest(postGTaskList, {
    manual: true,
  });

  const [page, setPage] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [rowData, setRowData] = useState({}) as any;
  const [rowTask, setRowTask] = useState([]) as any;
  const [open, setOpen] = useState(false);

  useAsyncEffect(async () => {
    const res = await runAsync({ ...page, pageIndex: page.pageIndex + 1 });
    if (res) {
      setTableData(res.data.data);
      setRowCount(res.data.total);
    }
  }, [page]);

  const actionPoints = useCallback(() => {
    if (!rowData.tasks) {
      return [];
    }
    if (rowTask.actionPoint?.length) {
      return rowTask.actionPoint;
    }

    if (rowData?.tasks.length) {
      return rowData.tasks[0].actionPoint;
    }
    return [];
  }, [rowData, rowTask]);

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{ height: "100%" }}
    >
      <Grid
        xs={6}
        item
        sx={{
          overflow: "auto",
        }}
      >
        {/* {tableData.length && ( */}
        <MuiTable
          columns={TaskColumn}
          data={tableData}
          pageChange={(pages) => {
            setPage(pages);
            setRowData({});
          }}
          rowCount={rowCount}
          // enableColumnResizing
          defaultColumn={{
            minSize: 100,
            size: 100,
            maxSize: 200,
          }}
          enableToolbarInternalActions={false}
          enableColumnActions={false}
          enableRowSelection={false}
          muiTableBodyRowProps={({ row }) => {
            return {
              sx: {
                cursor: "pointer",
                backgroundColor:
                  row.getValue("id") === rowData.id ? "#1e4141" : "",
              },
              onClick: () => {
                setRowData(row.original);
              },
            };
          }}
          initialState={{
            columnPinning: {
              right: ["actions"],
            },
          }}
          state={{
            isLoading: loading,
            showLoadingOverlay: false,
            showProgressBars: loading,
            pagination: { ...page },
          }}
          muiTablePaperProps={{
            sx: {
              height: "100%",
              padding: 2,
            },
          }}
          muiTableProps={{
            sx: {},
          }}
          muiTableBodyProps={{
            sx: {
              overflow: "auto",
            },
          }}
          renderTopToolbarCustomActions={() => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: "4px",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  color="warning"
                  onClick={() => {
                    setPage({
                      pageIndex: 0,
                      pageSize: 10,
                    });
                    setRowData({});
                  }}
                >
                  <Refresh loading={loading}></Refresh>
                  刷新
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  <AddIcon />
                  新增
                </Button>
              </Box>
            );
          }}
        ></MuiTable>
        {/* )} */}
      </Grid>
      <Grid xs={6} item container rowSpacing={2}>
        <Grid item xs={12}>
          {/* {tableData.length && ( */}
          <MuiTable
            columns={ChildTaskColumn}
            data={rowData?.tasks || []}
            // enableColumnResizing
            defaultColumn={{
              minSize: 100,
              size: 100,
              maxSize: 300,
            }}
            enableRowSelection={false}
            enablePagination={false}
            enableColumnActions={false}
            enableTopToolbar={false}
            muiTableBodyRowProps={({ row }) => {
              return {
                sx: {
                  cursor: "pointer",
                },
                onClick: () => {
                  setRowTask(row.original);
                },
              };
            }}
            initialState={{
              columnPinning: {
                right: ["actions"],
              },
            }}
            state={{
              isLoading: loading,
              showLoadingOverlay: false,
              showProgressBars: loading,
            }}
            muiTablePaperProps={{
              sx: {
                height: "100%",
                padding: 2,
              },
            }}
            muiTableProps={{
              sx: {
                height: "100%",
              },
            }}
            muiTableBodyProps={{
              sx: {
                height: "100%",
                overflow: "auto",
              },
            }}
          ></MuiTable>
          {/* )} */}
          {/* 新增区域 */}
          <AddTaskDialog open={open} onClose={() => setOpen(false)} />
        </Grid>
        <Grid item xs={12}>
          {/* {tableData.length && ( */}
          <MuiTable
            columns={TaskPointsColumn}
            data={actionPoints()}
            // enableColumnResizing
            // enableColumnResizing
            defaultColumn={{
              minSize: 100,
              size: 100,
              maxSize: 300,
            }}
            enableRowSelection={false}
            enablePagination={false}
            enableToolbarInternalActions={false}
            enableColumnActions={false}
            initialState={{
              columnPinning: {
                right: ["actions"],
              },
            }}
            state={{
              isLoading: loading,
              showLoadingOverlay: false,
              showProgressBars: loading,
            }}
            muiTablePaperProps={{
              sx: {
                height: "100%",
                padding: 2,
              },
            }}
            muiTableProps={{
              sx: {
                height: "100%",
              },
            }}
            muiTableBodyProps={{
              sx: {
                height: "100%",
                overflow: "auto",
              },
            }}
            renderTopToolbarCustomActions={() => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: "4px",
                  }}
                >
                  <Button variant="outlined" size="small" color="primary">
                    <AddIcon />
                    添加任务点
                  </Button>
                </Box>
              );
            }}
          ></MuiTable>
          {/* )} */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataTable;

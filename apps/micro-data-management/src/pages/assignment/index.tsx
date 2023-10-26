import { useAsyncEffect, useRequest } from "ahooks";
import { postGTaskList } from "apis";
import { useCallback, useState } from "react";
import { Grid, MuiTable } from "ui";

import { ChildTaskColumn, TaskColumn, TaskPointsColumn } from "./columns";

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

  useAsyncEffect(async () => {
    const res = await runAsync({ ...page, pageIndex: page.pageIndex + 1 });
    if (res) {
      setTableData(res.data.data);
      setRowCount(res.data.total);
    }
  }, [page.pageIndex]);

  const actionPoints = useCallback(() => {
    if (!rowData.tasks) {
      return [];
    }
    if (rowTask.actionPoint?.length) {
      return rowTask.actionPoint;
    }
    console.log(rowData.tasks.length);

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
        {tableData.length && (
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
          ></MuiTable>
        )}
      </Grid>
      <Grid xs={6} item container rowSpacing={2}>
        <Grid item xs={12}>
          {tableData.length && (
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
          )}
        </Grid>
        <Grid item xs={12}>
          {tableData.length && (
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
              enableTopToolbar={false}
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
            ></MuiTable>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataTable;

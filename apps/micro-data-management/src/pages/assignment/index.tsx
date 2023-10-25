import DeleteIcon from "@mui/icons-material/Delete";
import { useAsyncEffect, useRequest } from "ahooks";
import { postGTaskList } from "apis";
import { useState } from "react";
import { Button, Grid, MuiTable } from "ui";

import { TaskColumn } from "./columns";

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

  useAsyncEffect(async () => {
    const res = await runAsync({ ...page, pageIndex: page.pageIndex + 1 });
    if (res) {
      setTableData(res.data.data);
      setRowCount(res.data.total);
    }
  }, [page.pageIndex]);

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{ height: "100%" }}
    >
      <Grid xs={6} item>
        {tableData.length && (
          <MuiTable
            columns={TaskColumn}
            data={tableData}
            pageChange={setPage}
            rowCount={rowCount}
            // enableColumnResizing
            defaultColumn={{
              minSize: 100,
              size: 100,
              maxSize: 200,
            }}
            enableRowActions
            enableRowSelection={false}
            positionActionsColumn="last"
            muiTableBodyRowProps={(row) => {
              return {
                sx: {
                  cursor: "pointer",
                },
                onClick: () => {
                  alert(row);
                },
              };
            }}
            renderRowActions={() => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "0.5rem",
                  width: "100px",
                }}
              >
                <Button
                  component="label"
                  size="small"
                  startIcon={<DeleteIcon />}
                >
                  设置取消
                </Button>
              </div>
            )}
            state={{
              isLoading: loading,
              showLoadingOverlay: false,
              showProgressBars: loading,
              pagination: { ...page },
            }}
          ></MuiTable>
        )}
      </Grid>
      <Grid xs={6} item container rowSpacing={2}>
        <Grid item xs={12}>
          1212
        </Grid>
        <Grid item xs={12}>
          1212
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataTable;

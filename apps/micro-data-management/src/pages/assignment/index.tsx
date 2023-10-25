import { useAsyncEffect, useRequest } from "ahooks";
import { postGTaskList } from "apis";
import { useState } from "react";
import { Box, Chip, Divider, Grid, MuiTable } from "ui";

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
    <>
      {tableData.length && (
        <MuiTable
          columns={[
            {
              accessorKey: "id",
              id: "id",
              header: "任务组ID",
            },
            {
              accessorKey: "taskCarrier",
              id: "taskCarrier",
              header: "分配小车",
              Cell: ({ row }) => {
                const { original } = row;
                const { tasks } = original;
                return (
                  <Chip
                    label={tasks[0].taskCarrier}
                    color="primary"
                    size="small"
                  ></Chip>
                );
              },
            },
            {
              accessorKey: "taskPoint",
              id: "taskPoint",
              header: "任务点",
              Cell: ({ row }) => {
                const { original } = row;

                const { tasks } = original;
                const tasksVDom = () => {
                  if (!tasks.length) {
                    return <></>;
                  }
                  return (
                    <>
                      <Grid container>
                        {tasks[0].actionPoint?.map(
                          (item: { vertexID: string }, i: number) => (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Chip
                                key={item.vertexID + i}
                                size="small"
                                label={item.vertexID}
                                variant="outlined"
                                color="primary"
                              />
                              {i !== tasks[0].actionPoint.length - 1 && (
                                <Divider orientation="vertical" flexItem>
                                  -
                                </Divider>
                              )}
                            </Box>
                          )
                        )}
                      </Grid>
                    </>
                  );
                };
                return <>{tasksVDom()}</>;
              },
            },
            {
              accessorKey: "taskDirection",
              id: "taskDirection",
              header: "描述",
            },
          ]}
          data={tableData}
          pageChange={setPage}
          rowCount={rowCount}
          state={{
            isLoading: loading,
            pagination: { ...page },
          }}
        ></MuiTable>
      )}
    </>
  );
};

export default DataTable;

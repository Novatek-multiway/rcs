import { useAsyncEffect, useRequest } from "ahooks";
import { postGTaskList } from "apis";
import { useMemo, useState } from "react";
import { Chip, MuiTable } from "ui";

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
                const tasksVDom = useMemo(() => {
                  if (!tasks.length) {
                    return <>o</>;
                  }
                  return tasks[0].actionPoints?.map((item) => (
                    <Chip key={item.taskCarrier} label={item.taskCarrier} />
                  ));
                }, [tasks]);
                return <>{tasksVDom}</>;
              },
            },
            {
              accessorKey: "age",
              id: "age",
              header: "任务点",
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

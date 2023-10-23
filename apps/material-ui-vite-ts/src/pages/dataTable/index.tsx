import { MuiTable } from "ui";
import { useRequest, useAsyncEffect } from "ahooks";
import { postGTaskList } from "apis";
import { useState } from "react";

const DataTable = () => {
  const { data, loading, runAsync } = useRequest(postGTaskList, {
    manual: true,
  });

  const [page, setPage] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [tableData, setTableData] = useState([]);

  useAsyncEffect(async () => {
    const res = await runAsync({
      pageNum: 1,
      pageSize: 10,
    });
    if (res) {
      setTableData(res.data.data);
    }
  }, []);

  return (
    <>
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
            Cell: ({ cell, row }) => {
              console.log(row);

              return <>111</>;
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
        state={{
          isLoading: loading,
        }}
      ></MuiTable>
    </>
  );
};

export default DataTable;

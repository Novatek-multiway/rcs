import { MuiTable } from "ui";
import { useRequest, useAsyncEffect } from "ahooks";
import { postGTaskList } from "apis";

const DataTable = () => {
  const { data, loading, runAsync } = useRequest(postGTaskList, {
    manual: true,
  });

  useAsyncEffect(async () => {
    const res = await runAsync({
      pageNum: 1,
      pageSize: 10,
    });
    if (res) {
      console.log(res);
    }
  }, []);

  return (
    <>
      <MuiTable
        columns={[
          {
            accessorKey: "id",
            id: "id",
            header: "ID",
          },
          {
            accessorKey: "name",
            id: "name",
            header: "Name",
          },
          {
            accessorKey: "age",
            id: "age",
            header: "Age",
          },
        ]}
        data={[
          {
            id: 1,
            name: "张三",
            age: 18,
          },
        ]}
      ></MuiTable>
    </>
  );
};

export default DataTable;

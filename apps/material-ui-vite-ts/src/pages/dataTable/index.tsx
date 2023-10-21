import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MuiTable } from "ui";

const DataTable = () => {
  return (
    <>
      <Button type="button">
        <Link to={"/"}>跳转到首页</Link>
      </Button>
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

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const DataTable = () => {
  return (
    <>
      DataTable
      <Button type="button">
        <Link to={"/"}>跳转到首页</Link>
      </Button>
    </>
  );
};

export default DataTable;

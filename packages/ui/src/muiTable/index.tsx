import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import React, { FC } from "react";

interface TableProps {
  data: any[];
  columns: MRT_ColumnDef<Record<any, any>>[];
}
const MuiTable: FC<TableProps> = (props) => {
  const { data, columns } = props;
  const table = useMaterialReactTable({
    columns,
    data,
  });
  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default MuiTable;

import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_PaginationState,
  MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import React, { FC } from "react";

interface TableProps extends MRT_TableOptions<any> {
  data: any[];
  columns: MRT_ColumnDef<Record<any, any>>[];
  pageChange?(pages: MRT_PaginationState): void;
}
const MuiTable: FC<TableProps> = (props) => {
  const { data, columns, pageChange, ...rest } = props;
  const table = useMaterialReactTable({
    columns,
    data,
  });
  return (
    <>
      <MaterialReactTable
        table={table}
        enableRowSelection
        onPaginationChange={pageChange}
        manualPagination={true}
        // rowCount={data.length}
        {...rest}
      />
    </>
  );
};

export default MuiTable;

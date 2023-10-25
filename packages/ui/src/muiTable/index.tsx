import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
} from "material-react-table";
import React, { FC } from "react";

interface TableProps extends MRT_TableOptions<Record<any, any>> {
  data: any[];
  columns: MRT_ColumnDef<Record<any, any>>[];
  pageChange: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}
const MuiTable: FC<TableProps> = (props) => {
  const { data, columns, pageChange, ...rest } = props;
  return (
    <>
      <MaterialReactTable
        data={data}
        columns={columns}
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

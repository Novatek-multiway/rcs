import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableOptions,
} from "material-react-table";
import { MRT_Localization_ZH_HANS } from "material-react-table/locales/zh-Hans";
import React, { FC } from "react";

interface TableProps extends MRT_TableOptions<Record<any, any>> {
  data: any[];
  columns: MRT_ColumnDef<Record<any, any>>[];
  pageChange?: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}
const MuiTable: FC<TableProps> = (props) => {
  const { data, columns, pageChange, ...rest } = props;
  console.log(data);
  return (
    <>
      <MaterialReactTable
        data={data}
        columns={columns}
        enableRowSelection
        onPaginationChange={pageChange}
        manualPagination={true}
        localization={MRT_Localization_ZH_HANS}
        // enableColumnResizing
        enableColumnFilters={false}
        enableFilters={false}
        enableSorting={false}
        initialState={{
          density: "compact",
        }}
        // rowCount={data.length}
        {...rest}
      />
    </>
  );
};

export default MuiTable;

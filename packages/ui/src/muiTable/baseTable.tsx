import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from "material-react-table";
import { MRT_Localization_ZH_HANS } from "material-react-table/locales/zh-Hans";
import { FC } from "react";

interface TableProps extends MRT_TableOptions<Record<any, any>> {
  data: any[];
  columns: MRT_ColumnDef<Record<any, any>>[];
  pageChange?: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
  loading?: boolean;
}
export const BaseTable: FC<TableProps> = (props) => {
  const { data, columns, loading, ...rest } = props;
  return (
    <MaterialReactTable
      columns={columns}
      data={data || []}
      muiTablePaperProps={{
        sx: {
          height: "100%",
          padding: 2,
        },
      }}
      state={{
        isLoading: loading,
      }}
      enableColumnActions={false}
      localization={MRT_Localization_ZH_HANS}
      enableToolbarInternalActions={false}
      {...rest}
    />
  );
};

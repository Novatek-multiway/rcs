import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData, //default shape of TData (Record<string, any>)
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ZH_HANS } from "material-react-table/locales/zh-Hans";
interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
  columns: MRT_ColumnDef<TData>[];
  data: TData[];
  loading?: boolean;
}
export const BaseTable = <TData extends MRT_RowData>(props: Props<TData>) => {
  const { data, columns, loading, ...rest } = props;
  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: loading,
    },
    muiTablePaperProps: {
      sx: {
        height: "100%",
        padding: 2,
      },
    },
    localization: MRT_Localization_ZH_HANS,
    enableToolbarInternalActions: false,
    enableColumnActions: false,

    //your custom table options...
    ...rest, //accept props to override default table options
  });
  return <MaterialReactTable table={table} />;
};

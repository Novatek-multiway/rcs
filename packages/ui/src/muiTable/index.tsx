import {
  // MaterialReactTable,
  type MRT_ColumnDef,
  MRT_PaginationState,
  MRT_TableOptions,
  // useMaterialReactTable,
} from "material-react-table";
import { FC } from "react";

interface TableProps extends MRT_TableOptions<any> {
  data: any[];
  columns: MRT_ColumnDef<Record<any, any>>[];
  pageChange?(pages: MRT_PaginationState): void;
}
const MuiTable: FC<TableProps> = () => {
  // const { data, columns, ...rest } = props;
  // const table = useMaterialReactTable({
  //   columns,
  //   data,
  // });
  return <>123</>;
};

export default MuiTable;

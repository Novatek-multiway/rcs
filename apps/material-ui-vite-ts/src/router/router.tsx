import KeeperHoc from "./keeperHoc";
import Databoard from "@/pages/dashboard";
import NotFound from "@/pages/noFound";
import DataTable from "@/pages/dataTable";
const router = [
  {
    path: "/",
    element: KeeperHoc("/", <Databoard />),
    errorElement: <NotFound />,
  },
  {
    path: "/data-table",
    element: KeeperHoc("/data-table", <DataTable />),
  },
];

export default router;

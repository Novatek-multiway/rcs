import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/noFound";

const router = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default router;

import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Assignment = lazy(() => import("@/pages/assignment"));
const NotFound = lazy(() => import("@/pages/noFound"));
const Vehicle = lazy(() => import("@/pages/vehicle"));
const Stats = lazy(() => import("@/pages/stats"));
const VehicleOperation = lazy(
  () => import("@/pages/stats/c-pages/vehicle-operation")
);
const Configuration = lazy(() => import("@/pages/configuration"));
const Charge = lazy(() => import("@/pages/configuration/c-pages/charge"));
const Event = lazy(() => import("@/pages/configuration/c-pages/event"));
const Map = lazy(() => import("@/pages/configuration/c-pages/map"));
const Point = lazy(() => import("@/pages/configuration/c-pages/point"));
const StandByPoint = lazy(
  () => import("@/pages/configuration/c-pages/standByPoint")
);
const User = lazy(() => import("@/pages/configuration/c-pages/user"));
const VehicleType = lazy(
  () => import("@/pages/configuration/c-pages/vehicleType")
);

const router: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/assignment"} />,
  },
  {
    path: "/assignment",
    element: <Assignment />,
  },
  {
    path: "/vehicle",
    element: <Vehicle />,
  },
  {
    path: "/stats",
    element: <Stats />,
    children: [
      {
        path: "vehicle-operation",
        element: <VehicleOperation />,
      },
    ],
  },
  {
    path: "/configuration",
    element: <Configuration />,
    children: [
      {
        path: "charge",
        element: <Charge />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "point",
        element: <Point />,
      },
      {
        path: "stand-by-point",
        element: <StandByPoint />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "vehicle-type",
        element: <VehicleType />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default router;

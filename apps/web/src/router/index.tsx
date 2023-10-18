import { ComponentType, lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { type ILayoutData, Layout, PageLoading, type TLayoutRoutes } from "ui";

import MicroApp from "@/components/microApp";
/**
 * @description: 自动生成后台Layout下的routes 要求页面定义在src/pages目录下, 每个页面都有个page.ts定义路由元信息.如果存在嵌套路由, 需要按照src/pages/** /c-pages/** /index.tsx的方式定义
 * @return {*}
 */
const generatePageRoutes = () => {
  const pageModule = import.meta.glob("../pages/**/page.{ts,tsx}", {
    eager: true,
    import: "default",
  });
  const asyncComponentModule = import.meta.glob<
    boolean,
    string,
    { default: ComponentType<any> }
  >("../pages/**/index.tsx");
  const notPageNameStrings = [
    "..",
    ".",
    "pages",
    "page.ts",
    "page.tsx",
    "c-pages",
  ];

  const pageModuleEntries = Object.entries(pageModule);
  const routes: TLayoutRoutes = [];
  const pagesInfo = pageModuleEntries
    .map(([pageModulePath, meta]) => {
      const pageNameStrings = pageModulePath
        .split("/")
        .filter((x) => !notPageNameStrings.includes(x));
      return {
        path: pageNameStrings,
        pageModulePath,
        meta: meta as ILayoutData,
      };
    })
    .sort((a, b) => {
      if (a.path.length === b.path.length && a.meta.order && b.meta.order) {
        return a.meta.order - b.meta.order;
      }
      return a.path.length - b.path.length;
    });
  pagesInfo.forEach((pageInfo) => {
    const parentRoute = routes.find((route) => route.path === pageInfo.path[0]);
    const Component = lazy(
      asyncComponentModule[
        pageInfo.pageModulePath.replace(/page.ts[x]?/, "index.tsx")
      ]
    );
    const route = {
      path: pageInfo.path.at(-1),
      element: (
        <Suspense fallback={<PageLoading />}>
          <Component />
        </Suspense>
      ),
      ...pageInfo.meta,
      children: [],
    };
    if (parentRoute) {
      parentRoute.children!.push(route);
    } else {
      routes.push(route);
    }
  });

  return routes;
};
const defineRoutes = [
  ...generatePageRoutes(),
  {
    menu: true,
    title: "material-ui-vite-ts",
    path: "material-ui-vite-ts",
    name: "子应用1",
    element: (
      <div>
        <MicroApp
          name="material-ui-vite-ts"
          sandbox={{
            experimentalStyleIsolation: true,
          }}
          props={{}}
        />
      </div>
    ),
  },
];

const routes: TLayoutRoutes = [
  {
    path: "/",
    element: <Navigate to={"/home"} />,
    name: "重定向",
    id: "redirect",
  },
  {
    element: <Layout routes={defineRoutes} />,
    id: "layout",
    name: "布局",
    children: [...defineRoutes],
  },
];

const RouterConfig = () => {
  return createBrowserRouter(routes);
};

export default RouterConfig;

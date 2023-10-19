import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import { renderWithQiankun } from "vite-plugin-qiankun/dist/helper";
const appName = "system";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import routerList from "@/router/router";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";

export default function start(props: any = {}) {
  debugger;
  const { container } = props;
  ReactDOM.createRoot(
    container
      ? container.querySelector(`#${appName}-root`)
      : document.getElementById(`${appName}-root`)!
  ).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App>
          <BrowserRouter
            basename={
              qiankunWindow.__POWERED_BY_QIANKUN__ ? `/${appName}` : "/"
            }
          >
            <Routes>
              {routerList.map((item) => (
                <Route
                  key={item.path}
                  path={item.path}
                  element={item.element}
                ></Route>
              ))}
              <Route path="*" element={routerList[0].errorElement} />
            </Routes>
            {/* {!qiankunWindow.__POWERED_BY_QIANKUN__ && <SingleControl />} */}
          </BrowserRouter>
        </App>
      </ThemeProvider>
    </React.StrictMode>
  );
}

function applyProps(props: any) {}

renderWithQiankun({
  bootstrap() {
    console.log(`[${appName}] bootstrap`);
  },
  mount(props: any) {
    console.log(`[${appName}] mount`, props);
    applyProps(props);
    start(props);
  },
  update(props: any) {
    console.log(`[${appName}] update`, props);
    applyProps(props?.props ?? props);
  },
  unmount(props: any) {
    console.log(`[${appName}] unmount`);
    const { container } = props;
    ReactDOM.createRoot(
      container
        ? container.querySelector(`#${appName}-root`)
        : document.getElementById("root")
    ).unmount();
  },
});

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  start();
}

// @ts-ignore
if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  import("@/hmr.fix");
}

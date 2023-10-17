import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import { renderWithQiankun } from "vite-plugin-qiankun/dist/helper";
const appName = "material-ui-vite-ts";

export default function start(props: any = {}) {
  const { container } = props;
  debugger;
  ReactDOM.createRoot(
    container
      ? container.querySelector(`#${appName}-root`)
      : document.getElementById(`${appName}-root`)!
  ).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
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

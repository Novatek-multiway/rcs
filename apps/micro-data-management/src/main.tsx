import ReactDOM from "react-dom";
// import * as ReactDOM from "react-dom/client";
import { renderWithQiankun } from "vite-plugin-qiankun/dist/helper";

import App from "./App";

const appName = import.meta.env.VITE_APP_NAME;

export default function start(props: any = {}) {
  const { container } = props;
  ReactDOM.render(
    <App />,
    container
      ? container.querySelector(`#${appName}-root`)
      : document.querySelector(`#${appName}-root`)
  );
}

renderWithQiankun({
  bootstrap() {
    console.log(`[${appName}] bootstrap`);
  },
  mount(props: any) {
    console.log(`[${appName}] mount`, props);
    start(props);
  },
  update(props: any) {
    console.log(`[${appName}] update`, props);
  },
  unmount(props: any) {
    console.log(`[${appName}] unmount`, props);
    const { container } = props;
    ReactDOM.unmountComponentAtNode(
      container
        ? container.querySelector(`#${appName}-root`)
        : document.querySelector(`#${appName}-root`)
    );
  },
});

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  start();
}

// @ts-ignore
if (process.env.NODE_ENV === "development") {
  import("@/hmr.fix");
}

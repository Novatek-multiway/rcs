import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import qiankunInit from "./qiankun.ts";

function init() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App></App>
  );
  qiankunInit();
}

init();

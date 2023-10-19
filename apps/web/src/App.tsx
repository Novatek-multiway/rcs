import "normalize.css";
import "./style.css";

import { RouterProvider } from "react-router-dom";

import RouterConfig from "./router";

function App() {
  return (
    <>
      <RouterProvider router={RouterConfig}></RouterProvider>
    </>
  );
}

export default App;

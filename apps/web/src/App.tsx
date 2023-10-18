import "normalize.css";
import "./style.css";

import { RouterProvider } from "react-router-dom";

import SignalR from "./components/signalR";
import RouterConfig from "./router";

function App() {
  return (
    <>
      <SignalR></SignalR>
      <RouterProvider router={RouterConfig()}></RouterProvider>
    </>
  );
}

export default App;

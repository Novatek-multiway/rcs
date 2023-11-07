import "normalize.css";
import "./style.css";

import { useAsyncEffect } from "ahooks";
import { useAuth } from "hooks";
import { RouterProvider } from "react-router-dom";

import RouterConfig from "./router";

function App() {
  const { globalLogin } = useAuth();
  useAsyncEffect(async () => {
    await globalLogin();
  }, []);

  return (
    <>
      <RouterProvider router={RouterConfig}></RouterProvider>
    </>
  );
}

export default App;

import { registerMicroApps, start } from "qiankun";

function qiankunInit() {
  registerMicroApps(
    [
      {
        name: "system",
        entry: "http://localhost:8001",
        container: "#app",
        activeRule: (location) => {
          return location.pathname.startsWith("/system");
        },
        props: {},
      },
    ],
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      beforeLoad: () => {
        // 子应用加载时显示loading
      },

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      afterMount: () => {
        // 子应用挂载后隐藏loading
      },
    }
  );

  start();
}

export default qiankunInit;

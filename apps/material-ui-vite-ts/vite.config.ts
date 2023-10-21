import { getConfig } from "@packages/build/vite.config";
import { defineConfig, mergeConfig, loadEnv, type UserConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const sharedConfig = getConfig({
    type: "react",
    dirname: __dirname,
    micro: true,
    moduleName: "system",
    env,
  });

  const productionConfig: UserConfig = {
    build: {
      target: "esnext",
      rollupOptions: {
        output: {
          name: "system",
        },
      },
    },
  };
  const developmentConfig: UserConfig = {
    server: {
      port: 8001,
      // cors: true, // 慎用
      origin: "http://localhost:8001",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          target: "http://192.168.1.240:5202",
          changeOrigin: true,
          secure: true, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };

  return {
    ...mergeConfig(
      sharedConfig,
      mode === "production" ? productionConfig : developmentConfig
    ),
  };
});

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
      cors: true, // 慎用
      origin: "http://localhost:8001",
      headers: {
        "Access-Control-Allow-Origin": "*",
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

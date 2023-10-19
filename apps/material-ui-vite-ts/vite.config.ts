import { getConfig } from "@packages/build/vite.config";
import { defineConfig, mergeConfig } from "vite";
const sharedConfig = getConfig({
  type: "react",
  dirname: __dirname,
  micro: true,
  moduleName: "system",
});

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(sharedConfig, {
    server: {
      host: true,
      port: 8001,
      hmr: { port: 8081 },
    },
  })
);

import { getConfig } from "@packages/build/vite.config";
import { defineConfig, mergeConfig } from "vite";
const sharedConfig = getConfig({
  type: "react",
  dirname: __dirname,
});

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(sharedConfig, {
    server: {
      port: 5200,
      proxy: {
        "/api": {
          target: "http://120.79.8.215:5200",
          secure: false,
        },
        "/demo-react-1": "http://localhost:8081/",
      },
    },
  })
);

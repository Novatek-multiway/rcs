import { getConfig } from "@packages/build/vite.config";
import path from "path";
import { defineConfig, loadEnv, mergeConfig, UserConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const sharedConfig = getConfig({
    type: "react",
    dirname: __dirname,
    env,
  });
  return mergeConfig(sharedConfig, {
    resolve: {
      alias: [
        // fix less import by: @import ~
        // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
        // https://github.com/vitejs/vite/issues/2185
        { find: /^~/, replacement: "" },
        { find: "@", replacement: path.resolve(process.cwd(), "./src") },
      ],
    },
    server: {
      port: 5200,
      strictPort: true,
    },
  } as UserConfig);
});

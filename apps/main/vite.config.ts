import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  plugins: [react()],
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
    proxy: {
      "/api": {
        target: "http://120.79.8.215:5200",
        secure: false,
      },
    },
  },
});

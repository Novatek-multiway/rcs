// vite.config.ts
import { getConfig } from "file:///Users/suironghua/Desktop/multiway_git/rcs-mnp-web/packages/build/vite.config.js";
import path from "path";
import { defineConfig, loadEnv, mergeConfig } from "file:///Users/suironghua/Desktop/multiway_git/rcs-mnp-web/node_modules/.pnpm/vite@4.4.9_@types+node@20.4.7/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/suironghua/Desktop/multiway_git/rcs-mnp-web/apps/main";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const sharedConfig = getConfig({
    type: "react",
    dirname: __vite_injected_original_dirname,
    env
  });
  return mergeConfig(sharedConfig, {
    resolve: {
      alias: [
        // fix less import by: @import ~
        // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
        // https://github.com/vitejs/vite/issues/2185
        { find: /^~/, replacement: "" },
        { find: "@", replacement: path.resolve(process.cwd(), "./src") }
      ]
    },
    server: {
      port: 5200,
      strictPort: true
    }
  });
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3Vpcm9uZ2h1YS9EZXNrdG9wL211bHRpd2F5X2dpdC9yY3MtbW5wLXdlYi9hcHBzL21haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zdWlyb25naHVhL0Rlc2t0b3AvbXVsdGl3YXlfZ2l0L3Jjcy1tbnAtd2ViL2FwcHMvbWFpbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc3Vpcm9uZ2h1YS9EZXNrdG9wL211bHRpd2F5X2dpdC9yY3MtbW5wLXdlYi9hcHBzL21haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tIFwiQHBhY2thZ2VzL2J1aWxkL3ZpdGUuY29uZmlnXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBtZXJnZUNvbmZpZywgVXNlckNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XG4gIGNvbnN0IHNoYXJlZENvbmZpZyA9IGdldENvbmZpZyh7XG4gICAgdHlwZTogXCJyZWFjdFwiLFxuICAgIGRpcm5hbWU6IF9fZGlybmFtZSxcbiAgICBlbnYsXG4gIH0pO1xuICByZXR1cm4gbWVyZ2VDb25maWcoc2hhcmVkQ29uZmlnLCB7XG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IFtcbiAgICAgICAgLy8gZml4IGxlc3MgaW1wb3J0IGJ5OiBAaW1wb3J0IH5cbiAgICAgICAgLy8gbGVzcyBpbXBvcnQgbm8gc3VwcG9ydCB3ZWJwYWNrIGFsaWFzICd+JyBcdTAwQjcgSXNzdWUgIzIxODUgXHUwMEI3IHZpdGVqcy92aXRlXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvMjE4NVxuICAgICAgICB7IGZpbmQ6IC9efi8sIHJlcGxhY2VtZW50OiBcIlwiIH0sXG4gICAgICAgIHsgZmluZDogXCJAXCIsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCIuL3NyY1wiKSB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogNTIwMCxcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgfSxcbiAgfSBhcyBVc2VyQ29uZmlnKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVyxTQUFTLGlCQUFpQjtBQUNoWSxPQUFPLFVBQVU7QUFDakIsU0FBUyxjQUFjLFNBQVMsbUJBQStCO0FBRi9ELElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxRQUFNLGVBQWUsVUFBVTtBQUFBLElBQzdCLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNUO0FBQUEsRUFDRixDQUFDO0FBQ0QsU0FBTyxZQUFZLGNBQWM7QUFBQSxJQUMvQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJTCxFQUFFLE1BQU0sTUFBTSxhQUFhLEdBQUc7QUFBQSxRQUM5QixFQUFFLE1BQU0sS0FBSyxhQUFhLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxPQUFPLEVBQUU7QUFBQSxNQUNqRTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRixDQUFlO0FBQ2pCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

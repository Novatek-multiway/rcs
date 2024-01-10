// vite.config.ts
import { getConfig } from "file:///Users/niyonggui/multiway/2024/projects/rcs-detail-mnp-web/packages/build/vite.config.js";
import { defineConfig, loadEnv, mergeConfig } from "file:///Users/niyonggui/multiway/2024/projects/rcs-detail-mnp-web/node_modules/.pnpm/vite@4.5.0_@types+node@18.18.7/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/niyonggui/multiway/2024/projects/rcs-detail-mnp-web/apps/micro-data-management";
var ipRegex = /:\d+(\/)?/g;
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const matches = env.VITE_APP_HOST.match(ipRegex);
  const ip = matches[0].slice(1).replace("/", "");
  const sharedConfig = getConfig({
    type: "react",
    dirname: __vite_injected_original_dirname,
    micro: true,
    moduleName: env.VITE_APP_NAME,
    env
  });
  const productionConfig = {
    build: {
      target: "esnext",
      rollupOptions: {
        output: {
          name: env.VITE_APP_NAME
        }
      }
    }
  };
  const developmentConfig = {
    server: {
      port: parseInt(ip),
      cors: true,
      // 慎用
      origin: env.VITE_APP_HOST,
      hmr: {
        // host: "localhost",
        port: parseInt(ip)
      },
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  };
  return {
    ...mergeConfig(sharedConfig, mode === "production" ? productionConfig : developmentConfig),
    base: mode === "development" ? "/" : env.VITE_APP_HOST
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbml5b25nZ3VpL211bHRpd2F5LzIwMjQvcHJvamVjdHMvcmNzLWRldGFpbC1tbnAtd2ViL2FwcHMvbWljcm8tZGF0YS1tYW5hZ2VtZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbml5b25nZ3VpL211bHRpd2F5LzIwMjQvcHJvamVjdHMvcmNzLWRldGFpbC1tbnAtd2ViL2FwcHMvbWljcm8tZGF0YS1tYW5hZ2VtZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uaXlvbmdndWkvbXVsdGl3YXkvMjAyNC9wcm9qZWN0cy9yY3MtZGV0YWlsLW1ucC13ZWIvYXBwcy9taWNyby1kYXRhLW1hbmFnZW1lbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICdAcGFja2FnZXMvYnVpbGQvdml0ZS5jb25maWcnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIG1lcmdlQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5jb25zdCBpcFJlZ2V4ID0gLzpcXGQrKFxcLyk/L2dcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG5cbiAgY29uc3QgbWF0Y2hlcyA9IGVudi5WSVRFX0FQUF9IT1NULm1hdGNoKGlwUmVnZXgpXG4gIGNvbnN0IGlwID0gbWF0Y2hlc1swXS5zbGljZSgxKS5yZXBsYWNlKCcvJywgJycpXG5cbiAgY29uc3Qgc2hhcmVkQ29uZmlnID0gZ2V0Q29uZmlnKHtcbiAgICB0eXBlOiAncmVhY3QnLFxuICAgIGRpcm5hbWU6IF9fZGlybmFtZSxcbiAgICBtaWNybzogdHJ1ZSxcbiAgICBtb2R1bGVOYW1lOiBlbnYuVklURV9BUFBfTkFNRSxcbiAgICBlbnZcbiAgfSlcblxuICBjb25zdCBwcm9kdWN0aW9uQ29uZmlnOiBVc2VyQ29uZmlnID0ge1xuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBuYW1lOiBlbnYuVklURV9BUFBfTkFNRVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IGRldmVsb3BtZW50Q29uZmlnOiBVc2VyQ29uZmlnID0ge1xuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogcGFyc2VJbnQoaXApLFxuICAgICAgY29yczogdHJ1ZSwgLy8gXHU2MTRFXHU3NTI4XG4gICAgICBvcmlnaW46IGVudi5WSVRFX0FQUF9IT1NULFxuICAgICAgaG1yOiB7XG4gICAgICAgIC8vIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgICAgIHBvcnQ6IHBhcnNlSW50KGlwKVxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4ubWVyZ2VDb25maWcoc2hhcmVkQ29uZmlnLCBtb2RlID09PSAncHJvZHVjdGlvbicgPyBwcm9kdWN0aW9uQ29uZmlnIDogZGV2ZWxvcG1lbnRDb25maWcpLFxuICAgIGJhc2U6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcgPyAnLycgOiBlbnYuVklURV9BUFBfSE9TVFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpYixTQUFTLGlCQUFpQjtBQUMzYyxTQUFTLGNBQWMsU0FBUyxtQkFBb0M7QUFEcEUsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTSxVQUFVO0FBRWhCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxRQUFNLFVBQVUsSUFBSSxjQUFjLE1BQU0sT0FBTztBQUMvQyxRQUFNLEtBQUssUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsUUFBUSxLQUFLLEVBQUU7QUFFOUMsUUFBTSxlQUFlLFVBQVU7QUFBQSxJQUM3QixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxZQUFZLElBQUk7QUFBQSxJQUNoQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sbUJBQStCO0FBQUEsSUFDbkMsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sTUFBTSxJQUFJO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLFFBQU0sb0JBQWdDO0FBQUEsSUFDcEMsUUFBUTtBQUFBLE1BQ04sTUFBTSxTQUFTLEVBQUU7QUFBQSxNQUNqQixNQUFNO0FBQUE7QUFBQSxNQUNOLFFBQVEsSUFBSTtBQUFBLE1BQ1osS0FBSztBQUFBO0FBQUEsUUFFSCxNQUFNLFNBQVMsRUFBRTtBQUFBLE1BQ25CO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCwrQkFBK0I7QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUFBLElBQ0wsR0FBRyxZQUFZLGNBQWMsU0FBUyxlQUFlLG1CQUFtQixpQkFBaUI7QUFBQSxJQUN6RixNQUFNLFNBQVMsZ0JBQWdCLE1BQU0sSUFBSTtBQUFBLEVBQzNDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

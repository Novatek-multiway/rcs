// vite.config.ts
import { getConfig } from "file:///Users/luyao/works/rcs-mnp-web/packages/build/vite.config.js";
import { defineConfig, loadEnv, mergeConfig } from "file:///Users/luyao/works/rcs-mnp-web/node_modules/.pnpm/vite@4.5.0_@types+node@20.5.1/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/luyao/works/rcs-mnp-web/apps/micro-data-management";
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
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  };
  return {
    ...mergeConfig(sharedConfig, mode === "production" ? productionConfig : developmentConfig)
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbHV5YW8vd29ya3MvcmNzLW1ucC13ZWIvYXBwcy9taWNyby1kYXRhLW1hbmFnZW1lbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9sdXlhby93b3Jrcy9yY3MtbW5wLXdlYi9hcHBzL21pY3JvLWRhdGEtbWFuYWdlbWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbHV5YW8vd29ya3MvcmNzLW1ucC13ZWIvYXBwcy9taWNyby1kYXRhLW1hbmFnZW1lbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICdAcGFja2FnZXMvYnVpbGQvdml0ZS5jb25maWcnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIG1lcmdlQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5jb25zdCBpcFJlZ2V4ID0gLzpcXGQrKFxcLyk/L2dcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG5cbiAgY29uc3QgbWF0Y2hlcyA9IGVudi5WSVRFX0FQUF9IT1NULm1hdGNoKGlwUmVnZXgpXG4gIGNvbnN0IGlwID0gbWF0Y2hlc1swXS5zbGljZSgxKS5yZXBsYWNlKCcvJywgJycpXG5cbiAgY29uc3Qgc2hhcmVkQ29uZmlnID0gZ2V0Q29uZmlnKHtcbiAgICB0eXBlOiAncmVhY3QnLFxuICAgIGRpcm5hbWU6IF9fZGlybmFtZSxcbiAgICBtaWNybzogdHJ1ZSxcbiAgICBtb2R1bGVOYW1lOiBlbnYuVklURV9BUFBfTkFNRSxcbiAgICBlbnZcbiAgfSlcblxuICBjb25zdCBwcm9kdWN0aW9uQ29uZmlnOiBVc2VyQ29uZmlnID0ge1xuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBuYW1lOiBlbnYuVklURV9BUFBfTkFNRVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IGRldmVsb3BtZW50Q29uZmlnOiBVc2VyQ29uZmlnID0ge1xuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogcGFyc2VJbnQoaXApLFxuICAgICAgY29yczogdHJ1ZSwgLy8gXHU2MTRFXHU3NTI4XG4gICAgICBvcmlnaW46IGVudi5WSVRFX0FQUF9IT1NULFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5tZXJnZUNvbmZpZyhzaGFyZWRDb25maWcsIG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/IHByb2R1Y3Rpb25Db25maWcgOiBkZXZlbG9wbWVudENvbmZpZylcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxpQkFBaUI7QUFDdlgsU0FBUyxjQUFjLFNBQVMsbUJBQW9DO0FBRHBFLElBQU0sbUNBQW1DO0FBR3pDLElBQU0sVUFBVTtBQUVoQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsUUFBTSxVQUFVLElBQUksY0FBYyxNQUFNLE9BQU87QUFDL0MsUUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFFBQVEsS0FBSyxFQUFFO0FBRTlDLFFBQU0sZUFBZSxVQUFVO0FBQUEsSUFDN0IsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsWUFBWSxJQUFJO0FBQUEsSUFDaEI7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLG1CQUErQjtBQUFBLElBQ25DLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLE1BQU0sSUFBSTtBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLG9CQUFnQztBQUFBLElBQ3BDLFFBQVE7QUFBQSxNQUNOLE1BQU0sU0FBUyxFQUFFO0FBQUEsTUFDakIsTUFBTTtBQUFBO0FBQUEsTUFDTixRQUFRLElBQUk7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQLCtCQUErQjtBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQUEsSUFDTCxHQUFHLFlBQVksY0FBYyxTQUFTLGVBQWUsbUJBQW1CLGlCQUFpQjtBQUFBLEVBQzNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

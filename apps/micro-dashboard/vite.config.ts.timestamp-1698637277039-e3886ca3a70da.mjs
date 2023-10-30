// vite.config.ts
import react from "file:///Users/suironghua/Desktop/multiway_git/rcs-mnp-web/node_modules/.pnpm/@vitejs+plugin-react@4.0.4_vite@4.4.9/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///Users/suironghua/Desktop/multiway_git/rcs-mnp-web/node_modules/.pnpm/vite@4.4.9_@types+node@20.4.7/node_modules/vite/dist/node/index.js";
import qiankun from "file:///Users/suironghua/Desktop/multiway_git/rcs-mnp-web/node_modules/.pnpm/vite-plugin-qiankun@1.0.15_typescript@5.2.2_vite@4.4.9/node_modules/vite-plugin-qiankun/dist/index.js";
var vite_config_default = defineConfig({
  base: "/micro-dashboard",
  define: {
    qiankunMainAppHost: `'http://localhost:8000'`
  },
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
    port: 8001
  },
  plugins: [
    react(),
    qiankun("react18", {
      useDevMode: true
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3Vpcm9uZ2h1YS9EZXNrdG9wL211bHRpd2F5X2dpdC9yY3MtbW5wLXdlYi9hcHBzL21pY3JvLWRhc2hib2FyZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3N1aXJvbmdodWEvRGVza3RvcC9tdWx0aXdheV9naXQvcmNzLW1ucC13ZWIvYXBwcy9taWNyby1kYXNoYm9hcmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3N1aXJvbmdodWEvRGVza3RvcC9tdWx0aXdheV9naXQvcmNzLW1ucC13ZWIvYXBwcy9taWNyby1kYXNoYm9hcmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBxaWFua3VuIGZyb20gJ3ZpdGUtcGx1Z2luLXFpYW5rdW4nXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnL21pY3JvLWRhc2hib2FyZCcsXG4gIGRlZmluZToge1xuICAgIHFpYW5rdW5NYWluQXBwSG9zdDogYCdodHRwOi8vbG9jYWxob3N0OjgwMDAnYFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIC8vIGZpeCBsZXNzIGltcG9ydCBieTogQGltcG9ydCB+XG4gICAgICAvLyBsZXNzIGltcG9ydCBubyBzdXBwb3J0IHdlYnBhY2sgYWxpYXMgJ34nIFx1MDBCNyBJc3N1ZSAjMjE4NSBcdTAwQjcgdml0ZWpzL3ZpdGVcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvMjE4NVxuICAgICAgeyBmaW5kOiAvXn4vLCByZXBsYWNlbWVudDogJycgfSxcbiAgICAgIHsgZmluZDogJ0AnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuL3NyYycpIH1cbiAgICBdXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgwMDFcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgcWlhbmt1bigncmVhY3QxOCcsIHtcbiAgICAgIHVzZURldk1vZGU6IHRydWVcbiAgICB9KVxuICBdXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1WSxPQUFPLFdBQVc7QUFDelosT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sYUFBYTtBQUdwQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSUwsRUFBRSxNQUFNLE1BQU0sYUFBYSxHQUFHO0FBQUEsTUFDOUIsRUFBRSxNQUFNLEtBQUssYUFBYSxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsT0FBTyxFQUFFO0FBQUEsSUFDakU7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUSxXQUFXO0FBQUEsTUFDakIsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

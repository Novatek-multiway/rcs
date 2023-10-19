const path = require("path");
const { mergeConfig } = require("vite");
const qiankun = require("vite-plugin-qiankun");
const { default: react } = require("@vitejs/plugin-react");
const { default: vue } = require("@vitejs/plugin-vue");
const nodeIP = require("ip");
const ip = nodeIP.address();

// https://vitejs.dev/config/
const getConfig = ({
  type = "react",
  micro = false,
  moduleName = "",
  dirname = process.cwd(),
} = {}) => {
  const serverConfig = {
    strictPort: true,
    proxy: {},
  };

  const initialPlugins = {
    vue: [vue()],
    react: [react()],
  }[type];

  const sharedViteConfig = {
    root: dirname,
    server: serverConfig,
    preview: serverConfig,
    resolve: {
      alias: [
        // fix less import by: @import ~
        // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
        // https://github.com/vitejs/vite/issues/2185
        { find: /^~/, replacement: "" },
        { find: "@", replacement: path.resolve(dirname, "./src") },
      ],
    },
    plugins: initialPlugins,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // plugins: [new LessNodeModules()],
        },
      },
    },
  };
  console.log("micro", micro);
  if (!micro) {
    return sharedViteConfig;
  }
  const microViteConfig = mergeConfig(sharedViteConfig, {
    base: `/${moduleName}`,
    plugins: [
      qiankun("react18", {
        useDevMode: true,
      }),
    ],
    build: {
      rollupOptions: {
        external: ["@/hmr.fix"],
      },
    },
  });

  return microViteConfig;
};

module.exports = {
  ip,
  getConfig,
};

const path = require('path')
const { mergeConfig } = require('vite')
const qiankun = require('vite-plugin-qiankun')
const { default: react } = require('@vitejs/plugin-react')
const { default: vue } = require('@vitejs/plugin-vue')
const nodeIP = require('ip')
const { visualizer } = require('rollup-plugin-visualizer')
const ip = nodeIP.address()

const visualizerPlugin = visualizer

// https://vitejs.dev/config/
const getConfig = ({ type = 'react', micro = false, moduleName = '', dirname = process.cwd(), env } = {}) => {
  const serverConfig = {
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://192.168.1.240:5203',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

  const initialPlugins = {
    vue: [vue()],
    react: [react()]
  }[type]

  const sharedViteConfig = {
    base: env.VITE_APP_HOST,
    define: {
      qiankunMainAppHost: `'${env.VITE_FEDERATION_HOST}'`
    },
    root: dirname,
    server: serverConfig,
    preview: serverConfig,
    resolve: {
      alias: [
        // fix less import by: @import ~
        // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
        // https://github.com/vitejs/vite/issues/2185
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(dirname, './src') }
      ]
    },
    plugins: [
      ...initialPlugins,
      visualizerPlugin({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
          // plugins: [new LessNodeModules()],
        }
      }
    }
  }
  if (!micro) {
    return sharedViteConfig
  }
  const microViteConfig = mergeConfig(sharedViteConfig, {
    base: `/${moduleName}`,
    plugins: [
      qiankun(`${moduleName}`, {
        useDevMode: true
      }),
      visualizerPlugin({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ],
    build: {
      rollupOptions: {
        external: ['@/hmr.fix'],
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]' // 资源文件像 字体，图片等
        }
      }
    }
  })

  return microViteConfig
}

module.exports = {
  ip,
  getConfig
}

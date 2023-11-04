import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
const ipRegex = /:\d+(\/)?/g
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const matches = env.VITE_APP_HOST.match(ipRegex)
  const ip = parseInt(matches[0].slice(1).replace('/', ''))
  return {
    base: '/micro-dashboard',
    define: {
      qiankunMainAppHost: `'http://localhost:8000'`
    },
    resolve: {
      alias: [
        // fix less import by: @import ~
        // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
        // https://github.com/vitejs/vite/issues/2185
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(process.cwd(), './src') }
      ]
    },
    server: {
      port: ip,
      hmr: {
        port: ip
      },
      proxy: {
        '/api': {
          target: 'http://192.168.1.240:5203',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      react(),
      qiankun('react18', {
        useDevMode: true
      })
    ]
  }
})

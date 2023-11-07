import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
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
    port: 8001,
    hmr: {
      port: 8001
    }
  },
  plugins: [
    react(),
    qiankun('react18', {
      useDevMode: true
    })
  ]
})

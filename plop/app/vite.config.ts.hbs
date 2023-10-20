import { getConfig } from '@packages/build/vite.config'
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite'

const ipRegex = /:\d+(\/)?/g
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const matches = env.VITE_APP_HOST.match(ipRegex)
  const ip = matches[0].slice(1).replace('/', '')

  const sharedConfig = getConfig({
    type: 'react',
    dirname: __dirname,
    micro: true,
    moduleName: env.VITE_APP_NAME,
    env
  })

  const productionConfig: UserConfig = {
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          name: env.VITE_APP_NAME
        }
      }
    }
  }
  const developmentConfig: UserConfig = {
    server: {
      port: parseInt(ip),
      cors: true, // 慎用
      origin: env.VITE_APP_HOST,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

  return {
    ...mergeConfig(sharedConfig, mode === 'production' ? productionConfig : developmentConfig)
  }
})

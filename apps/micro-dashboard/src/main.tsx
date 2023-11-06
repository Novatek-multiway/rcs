import './style.css'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import * as ReactDOM from 'react-dom/client'
import { useGlobalStore } from 'store'
import { renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'

import App from './App'

const appName = import.meta.env.VITE_APP_NAME

let root: ReactDOM.Root | null = null

export default function start(props: any = {}) {
  const { container } = props

  const isRenderByQiankun = !!container
  const rootContainer = container
    ? container.querySelector(`#${appName}-root`)
    : document.getElementById(`${appName}-root`)
  const myCache = createCache({
    key: appName,
    container: isRenderByQiankun ? container.querySelector('qiankun-head') : rootContainer
  })
  root = ReactDOM.createRoot(rootContainer)
  root.render(
    <CacheProvider value={myCache}>
      <App />
    </CacheProvider>
  )
}

renderWithQiankun({
  bootstrap() {
    console.log(`[${appName}] bootstrap`)
  },
  mount(props) {
    console.log(`[${appName}] mount`, props)
    props.onGlobalStateChange((state: Record<string, any>) => {
      state && useGlobalStore.getState().setGlobalState(state)
    })
    start(props)
  },
  update(props: any) {
    console.log(`[${appName}] update`, props)
  },
  unmount(props: any) {
    console.log(`[${appName}] unmount`, props)
    root?.unmount?.()
  }
})

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  start()
}

// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  import('@/hmr.fix')
}

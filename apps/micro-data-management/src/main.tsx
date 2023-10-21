import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'

import App from './App'

const appName = import.meta.env.VITE_APP_NAME

let root: ReactDOM.Root | null = null

export default function start(props: any = {}) {
  const { container } = props
  root = ReactDOM.createRoot(
    container ? container.querySelector(`#${appName}-root`) : document.getElementById(`${appName}-root`)!
  )
  root.render(<App />)
}

renderWithQiankun({
  bootstrap() {
    console.log(`[${appName}] bootstrap`)
  },
  mount(props: any) {
    console.log(`[${appName}] mount`, props)
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

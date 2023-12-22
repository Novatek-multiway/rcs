import './style.css'

import ReactDOM from 'react-dom'
import { useGlobalStore } from 'store'
// import * as ReactDOM from "react-dom/client";
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'

import App from './App'

const appName = import.meta.env.VITE_APP_NAME

export default function start(props: any = {}) {
  const { container } = props
  ReactDOM.render(
    <App />,
    container ? container.querySelector(`#${appName}-root`) : document.querySelector(`#${appName}-root`)
  )
}

renderWithQiankun({
  bootstrap() {
    console.log(`[${appName}] bootstrap`)
  },
  mount(props: any) {
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
    const { container } = props
    ReactDOM.unmountComponentAtNode(
      container ? container.querySelector(`#${appName}-root`) : document.querySelector(`#${appName}-root`)
    )
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  start()
}

// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  import('@/hmr.fix')
}

import { useAsyncEffect, useRequest } from 'ahooks'
import { getDicts } from 'apis'
import { useAuth } from 'hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDictStore } from 'store'
import { theme } from 'theme'
import { CssBaseline, ThemeProvider } from 'ui'
import { ToastContainer } from 'utils'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import routerList from '@/router/router'

import SystemConfig from './components/SystemConfig'

const { __POWERED_BY_QIANKUN__ } = qiankunWindow

const dictsTransform = (obj: Record<string, any[]>) => {
  const keys = Object.keys(obj)
  const newDicts: Record<string, { value: number; label: string }[]> = {}
  keys.forEach((key) => {
    newDicts[key] = obj[key].map((item) => ({
      value: item.dictValueI,
      label: item.dictLabel
    }))
  })
  return newDicts
}

const env = import.meta.env
export default function App() {
  const { setDicts } = useDictStore()
  useRequest(() => getDicts({}), {
    onSuccess: (res) => {
      if (res.data) {
        setDicts(dictsTransform(res.data))
      }
    }
  })
  const { globalLogin } = useAuth()
  useAsyncEffect(async () => {
    await globalLogin()
  }, [])

  return (
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <SystemConfig systemConfigPath={env.DEV ? env.VITE_APP_HOST : env.VITE_APP_BASE_PATH}>
        <BrowserRouter basename={__POWERED_BY_QIANKUN__ ? `/${env.VITE_APP_NAME}` : env.VITE_APP_BASE_PATH}>
          <Routes>
            {routerList.map((item) => (
              <Route key={item.path} path={item.path} element={item.element}></Route>
            ))}
          </Routes>
        </BrowserRouter>
      </SystemConfig>
    </ThemeProvider>
    // </React.StrictMode>
  )
}

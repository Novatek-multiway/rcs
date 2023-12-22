import { useAsyncEffect } from 'ahooks'
import { useAuth } from 'hooks'
import * as React from 'react'
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom'
import { theme } from 'theme'
import { CssBaseline, ThemeProvider } from 'ui'
import { ToastContainer } from 'utils'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import routerList from '@/router/router'

import GlobalContext from './global'

const { __POWERED_BY_QIANKUN__ } = qiankunWindow

const renderRoutes = (routes: RouteObject[]) =>
  routes.map((item) => (
    <Route key={item.path} path={item.path} element={item.element}>
      {item.children && renderRoutes(item.children)}
    </Route>
  ))

export default function App() {
  const { globalLogin } = useAuth()
  useAsyncEffect(async () => {
    await globalLogin()
  }, [])
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalContext />
        <ToastContainer />
        <BrowserRouter basename={__POWERED_BY_QIANKUN__ ? `/${import.meta.env.VITE_APP_NAME}` : '/'}>
          <React.Suspense fallback={'loading...'}>
            <Routes>{renderRoutes(routerList)}</Routes>
          </React.Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}

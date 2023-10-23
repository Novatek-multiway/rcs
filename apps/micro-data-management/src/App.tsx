import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import * as React from 'react'
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom'
import { theme } from 'theme'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import routerList from '@/router/router'

const renderRoutes = (routes: RouteObject[]) =>
  routes.map((item) => (
    <Route key={item.path} path={item.path} element={item.element}>
      {item.children && renderRoutes(item.children)}
    </Route>
  ))

export default function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? `/${import.meta.env.VITE_APP_NAME}` : '/'}>
          <React.Suspense fallback={'loading...'}>
            <Routes>{renderRoutes(routerList)}</Routes>
          </React.Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}

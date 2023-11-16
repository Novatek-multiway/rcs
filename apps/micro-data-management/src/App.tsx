import * as React from 'react'
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom'
import { theme } from 'theme'
import { CssBaseline, ThemeProvider } from 'ui'

import routerList from '@/router/router'

import GlobalContext from './global'

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
        <GlobalContext />
        <BrowserRouter basename={`/${import.meta.env.VITE_APP_NAME}`}>
          <React.Suspense fallback={'loading...'}>
            <Routes>{renderRoutes(routerList)}</Routes>
          </React.Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}

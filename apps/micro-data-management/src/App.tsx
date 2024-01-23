import { useVoerkaI18n } from '@voerkai18n/react'
import { useAsyncEffect } from 'ahooks'
import { useAuth, useIsLongLengthLanguage } from 'hooks'
import * as React from 'react'
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom'
import { theme } from 'theme'
import { CssBaseline, ThemeProvider } from 'ui'
import { ToastContainer } from 'utils'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import routerList from '@/router/router'

import LanguageProvider from './component/LanguageProvider'
import GlobalContext from './global'

const { __POWERED_BY_QIANKUN__ } = qiankunWindow

const renderRoutes = (routes: RouteObject[]) =>
  routes.map((item) => (
    <Route key={item.path} path={item.path} element={item.element}>
      {item.children && renderRoutes(item.children)}
    </Route>
  ))

const ExternalThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { activeLanguage } = useVoerkaI18n()
  const isLongLengthLanguage = useIsLongLengthLanguage(activeLanguage)
  return (
    <ThemeProvider
      theme={{
        ...theme,
        components: {
          ...theme.components,
          MuiTableHead: {
            styleOverrides: {
              root: {
                '.Mui-TableHeadCell-Content': {
                  fontSize: isLongLengthLanguage ? '0.72rem' : '0.875rem'
                }
              }
            }
          },
          MuiTableBody: {
            styleOverrides: {
              root: {
                '.MuiButton-root': {
                  fontSize: isLongLengthLanguage ? '0.75rem' : '0.8125rem'
                }
              }
            }
          }
        }
      }}
    >
      {children}
    </ThemeProvider>
  )
}

export default function App() {
  const { globalLogin } = useAuth()
  useAsyncEffect(async () => {
    await globalLogin()
  }, [])
  return (
    <React.StrictMode>
      <LanguageProvider>
        <ExternalThemeProvider>
          <CssBaseline />
          <GlobalContext />
          <ToastContainer />
          <BrowserRouter
            basename={__POWERED_BY_QIANKUN__ ? `/${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_BASE_PATH}
          >
            <React.Suspense fallback={'loading...'}>
              <Routes>{renderRoutes(routerList)}</Routes>
            </React.Suspense>
          </BrowserRouter>
        </ExternalThemeProvider>
      </LanguageProvider>
    </React.StrictMode>
  )
}

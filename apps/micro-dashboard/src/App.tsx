import { useAsyncEffect } from 'ahooks'
import { useAuth, useResponsiveAdapter } from 'hooks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { theme } from 'theme'
import { CssBaseline, ThemeProvider } from 'ui'
import { ToastContainer } from 'utils'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import routerList from '@/router/router'

import LanguageProvider from './components/LanguageProvider'
import SystemConfig from './components/SystemConfig'
import GlobalContext from './global'

const { __POWERED_BY_QIANKUN__ } = qiankunWindow

const env = import.meta.env
export default function App() {
  const { globalLogin } = useAuth()
  useAsyncEffect(async () => {
    await globalLogin()
  }, [])

  const { isAutoFitted } = useResponsiveAdapter('body', __POWERED_BY_QIANKUN__)
  return (
    (isAutoFitted || __POWERED_BY_QIANKUN__) && (
      // <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <CssBaseline />
          <GlobalContext />
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
        </LanguageProvider>
      </ThemeProvider>
      // </React.StrictMode>
    )
  )
}

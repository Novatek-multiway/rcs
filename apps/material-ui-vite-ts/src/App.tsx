import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import routerList from '@/router/router'

import { appName } from './main'
import theme from './theme'

export default function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? `/${appName}` : '/'}>
          <Routes>
            {routerList.map((item) => (
              <Route key={item.path} path={item.path} element={item.element}></Route>
            ))}
            <Route path="*" element={routerList[0].errorElement} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}

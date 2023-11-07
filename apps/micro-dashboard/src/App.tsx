import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { theme } from 'theme'

import routerList from '@/router/router'

export default function App() {
  return (
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={`/${import.meta.env.VITE_APP_NAME}`}>
        <Routes>
          {routerList.map((item) => (
            <Route key={item.path} path={item.path} element={item.element}></Route>
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    // </React.StrictMode>
  )
}

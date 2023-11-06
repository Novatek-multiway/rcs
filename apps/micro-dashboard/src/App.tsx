import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useRequest } from 'ahooks'
import { getDicts } from 'apis'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDictStore } from 'store'
import { theme } from 'theme'

import routerList from '@/router/router'

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

export default function App() {
  const { setDicts } = useDictStore()
  useRequest(() => getDicts({}), {
    onSuccess: (res) => {
      if (res.data) {
        setDicts(dictsTransform(res.data))
      }
    }
  })
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

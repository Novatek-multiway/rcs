import 'normalize.css'
import './style.css'

import { useAsyncEffect } from 'ahooks'
import { useAuth } from 'hooks'
import { RouterProvider } from 'react-router-dom'

import LanguageProvider from './components/LanguageProvider'
import RouterConfig from './router'

function App() {
  const { globalLogin } = useAuth()
  useAsyncEffect(async () => {
    await globalLogin()
  }, [])

  return (
    <>
      <LanguageProvider>
        <RouterProvider router={RouterConfig}></RouterProvider>
      </LanguageProvider>
    </>
  )
}

export default App

import 'normalize.css'
import './style.css'

import { useAsyncEffect } from 'ahooks'
import { useAuth, useResponsiveAdapter } from 'hooks'
import { RouterProvider } from 'react-router-dom'

import LanguageProvider from './components/LanguageProvider'
import RouterConfig from './router'

function App() {
  const { globalLogin } = useAuth()
  useAsyncEffect(async () => {
    await globalLogin()
  }, [])
  const { isAutoFitted } = useResponsiveAdapter()
  return (
    isAutoFitted && (
      <>
        <LanguageProvider>
          <RouterProvider router={RouterConfig}></RouterProvider>
        </LanguageProvider>
      </>
    )
  )
}

export default App

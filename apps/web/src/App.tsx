import 'normalize.css'
import './style.css'

import { HashRouter } from 'react-router-dom'

import SignalR from './components/signalR'
import RouterConfig from './router'

function App() {
  return (
    <>
      <SignalR></SignalR>
      <HashRouter>
        <RouterConfig />
      </HashRouter>
    </>
  )
}

export default App

import Dashboard from '@/pages/dashboard'
import NotFound from '@/pages/noFound'

import KeeperHoc from './keeperHoc'
const router = [
  {
    path: '/',
    element: KeeperHoc('/', <Dashboard />)
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default router

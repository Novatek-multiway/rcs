import Dashboard from '@/pages/dashboard'
import DataTable from '@/pages/dataTable'
import NotFound from '@/pages/noFound'

import KeeperHoc from './keeperHoc'
const router = [
  {
    path: '/',
    element: KeeperHoc('/', <Dashboard />),
    errorElement: <NotFound />
  },
  {
    path: '/data-table',
    element: KeeperHoc('/data-table', <DataTable />)
  }
]

export default router

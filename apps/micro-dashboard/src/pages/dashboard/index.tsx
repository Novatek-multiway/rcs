import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Button type="button">
      <Link to={'/data-table'}>跳转到数据表</Link>
    </Button>
  )
}

export default Dashboard

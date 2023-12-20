import { useVoerkaI18n } from '@voerkai18n/react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const { t } = useVoerkaI18n()
  return (
    <div className="not-found-page">
      <h1>{t('抱歉，您访问的页面不存在.')}</h1>
      <Link to="/">{t('返回到首页.')}</Link>
    </div>
  )
}

import { Layout } from 'ui'

import { updateMicroAppState } from '@/qiankun'

export default function Home() {
  const handleOnLogoTitleClick = () => {
    console.log('nav logo title click')
    updateMicroAppState(() => ({
      logoTitleClickTime: Date.now()
    }))
  }
  return (
    <Layout onLogoTitleClick={handleOnLogoTitleClick}>
      {/* <Card>主应用</Card> */}
      <div id="app"></div>
    </Layout>
  )
}

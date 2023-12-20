import { useGlobalStore } from 'store'
import { Box, CircularProgress, Layout, styled } from 'ui'
import { LayoutProps } from 'ui/src/layout/Layout'

import { updateMicroAppState } from '@/qiankun'

export default function Home() {
  const { GlobalLoading } = useGlobalStore()
  const handleOnLogoTitleClick = () => {
    updateMicroAppState(() => ({
      logoTitleClickTime: Date.now()
    }))
  }

  const handleSettingChange: NonNullable<LayoutProps['settingsProps']>['onSettingChange'] = (key, value) => {
    updateMicroAppState(() => ({
      [key]: value
    }))
  }

  const ProgressBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.background.default
  }))
  return (
    <Layout
      onLogoTitleClick={handleOnLogoTitleClick}
      settingsProps={{
        onSettingChange: handleSettingChange
      }}
    >
      {/* <Card>主应用</Card> */}
      <ProgressBox
        sx={{
          display: GlobalLoading ? 'flex' : 'none'
        }}
      >
        <CircularProgress color="inherit" />
      </ProgressBox>

      <div id="app"></div>
    </Layout>
  )
}

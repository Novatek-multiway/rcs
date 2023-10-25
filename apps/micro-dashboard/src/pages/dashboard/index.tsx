import { useUpdateEffect } from 'ahooks'
import { ElementRef, useRef } from 'react'
import { useGlobalStore } from 'store'

import { TwoDMapWrapper } from './components/2dMap/style'
import Aside from './components/aside'
import TimeStats from './components/timeStats'
import { DashboardWrapper } from './style'

const Dashboard = () => {
  const globalState = useGlobalStore((state) => state.globalState)
  const asideRef = useRef<ElementRef<typeof Aside>>(null)

  useUpdateEffect(() => {
    asideRef.current?.toggleAside()
  }, [globalState.logoTitleClickTime])
  return (
    <DashboardWrapper>
      <Aside
        ref={asideRef}
        left={
          <>
            <TimeStats />
          </>
        }
        right={<></>}
      />
      <TwoDMapWrapper />
    </DashboardWrapper>
  )
}

export default Dashboard

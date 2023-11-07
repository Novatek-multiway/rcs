import { useUpdateEffect } from 'ahooks'
import { ElementRef, memo, useCallback, useRef, useState } from 'react'
import { useGlobalStore } from 'store'

import Aside, { IAsideProps } from './components/aside'
import TaskStats from './components/taskStats'
import TimeStats from './components/timeStats'
import TwoDMap from './components/twoDMap'
import UtilizationRateStats from './components/utilizationRateStats'
import VehicleStatus from './components/vehicleStatus'
import { useDashboardStore } from './store'
import { DashboardWrapper } from './style'

const Dashboard = () => {
  const logoTitleClickTime = useGlobalStore((state) => state.globalState.logoTitleClickTime)
  const { asideOpen, setAsideOpen } = useDashboardStore((state) => ({
    asideOpen: state.asideOpen,
    setAsideOpen: state.setAsideOpen
  }))
  const asideRef = useRef<ElementRef<typeof Aside>>(null)

  useUpdateEffect(() => {
    const asideOpen = asideRef.current?.asideOpen
    setAsideOpen(!asideOpen)
  }, [logoTitleClickTime])

  useUpdateEffect(() => {
    const aside = asideRef.current
    const asideWidth = aside?.asideWidth || 300
    setToolbarRight((p) => (aside?.asideOpen ? p - asideWidth : p + asideWidth))
    asideOpen ? aside?.showAside() : aside?.hideAside()
  }, [asideOpen])

  const [toolbarRight, setToolbarRight] = useState(380)
  const handleSizeChange = useCallback<NonNullable<IAsideProps['onSizeChange']>>((size) => {
    setToolbarRight((size?.width || 360) + 20)
  }, [])
  return (
    <DashboardWrapper>
      <div className="content">
        <Aside
          ref={asideRef}
          left={
            <>
              <TimeStats />
              <UtilizationRateStats />
            </>
          }
          right={
            <>
              <VehicleStatus />
              <TaskStats />
            </>
          }
          onSizeChange={handleSizeChange}
        />
        <TwoDMap toolbarRight={toolbarRight} />
      </div>
    </DashboardWrapper>
  )
}

export default memo(Dashboard)

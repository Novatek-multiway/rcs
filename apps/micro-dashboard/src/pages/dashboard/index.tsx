import { useUpdateEffect } from 'ahooks'
import { ElementRef, useCallback, useRef, useState } from 'react'
import { useGlobalStore } from 'store'

import Aside, { IAsideProps } from './components/aside'
import TaskStats from './components/taskStats'
import TimeStats from './components/timeStats'
import TwoDMap from './components/twoDMap'
import UtilizationRateStats from './components/utilizationRateStats'
import VehicleStatus from './components/vehicleStatus'
import { DashboardWrapper } from './style'

const Dashboard = () => {
  const globalState = useGlobalStore((state) => state.globalState)
  const asideRef = useRef<ElementRef<typeof Aside>>(null)

  useUpdateEffect(() => {
    const aside = asideRef.current
    const asideWidth = aside?.asideWidth || 300
    aside?.toggleAside()
    setToolbarRight((p) => (aside?.asideOpen ? p - asideWidth : p + asideWidth))
  }, [globalState.logoTitleClickTime])

  const [toolbarRight, setToolbarRight] = useState(380)
  const handleSizeChange = useCallback<NonNullable<IAsideProps['onSizeChange']>>((size) => {
    console.log('🚀 ~ file: index.tsx ~ line 22 ~ handleSizeChange ~ size', size)
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

export default Dashboard

import { useUpdateEffect } from 'ahooks'
import { ElementRef, useRef } from 'react'
import { useGlobalStore } from 'store'

import { TwoDMapWrapper } from './components/2dMap/style'
import Aside from './components/aside'
import TaskStats from './components/taskStats'
import TimeStats from './components/timeStats'
import UtilizationRateStats from './components/utilizationRateStats'
import VehicleStatus from './components/vehicleStatus'
import { DashboardWrapper } from './style'

const Dashboard = () => {
  const globalState = useGlobalStore((state) => state.globalState)
  const asideRef = useRef<ElementRef<typeof Aside>>(null)

  useUpdateEffect(() => {
    asideRef.current?.toggleAside()
  }, [globalState.logoTitleClickTime])
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
        />
        <TwoDMapWrapper />
      </div>
    </DashboardWrapper>
  )
}

export default Dashboard

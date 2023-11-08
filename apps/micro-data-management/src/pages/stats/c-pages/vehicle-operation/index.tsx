import type { FC, ReactNode } from 'react'
import React, { memo } from 'react'

import Efficiency from './components/efficiency'
import ElapsedTimeRatio from './components/elapsedTimeRatio'
import Electricity from './components/electricity'
import FinishedTasks from './components/finishedTasks'
import Mileage from './components/mileage'
import NoFaultTime from './components/noFaultTime'
import SearchArea from './components/searchArea'
import UtilizationRate from './components/utilizationRate'
import { VehicleOperationWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const VehicleOperation: FC<IProps> = () => {
  return (
    <VehicleOperationWrapper>
      <SearchArea />
      <div className="content">
        <div className="header">
          <div style={{ width: '25%' }}>
            <Electricity />
          </div>

          <div style={{ flex: 1 }}>
            <Efficiency />
          </div>

          <div style={{ width: '25%' }}>
            <ElapsedTimeRatio />
          </div>
        </div>
        <div className="footer">
          <div style={{ width: '25%' }}>
            <UtilizationRate />
          </div>
          <div style={{ width: '25%' }}>
            <NoFaultTime />
          </div>
          <div style={{ width: '25%' }}>
            <FinishedTasks />
          </div>
          <div style={{ width: '25%' }}>
            <Mileage />
          </div>
        </div>
      </div>
    </VehicleOperationWrapper>
  )
}

export default memo(VehicleOperation)

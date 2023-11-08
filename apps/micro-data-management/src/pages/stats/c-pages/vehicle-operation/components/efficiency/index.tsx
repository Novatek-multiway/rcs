import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { Panel } from 'ui'

import PercentagePieChart from './components/percentagePieChart'
import { EfficiencyWrapper } from './style'

interface IEfficiencyProps {}

// 效率统计
const Efficiency: FC<PropsWithChildren<IEfficiencyProps>> = () => {
  return (
    <Panel
      title="效率统计"
      wrapperStyle={{
        height: '100%'
      }}
      contentWrapperStyle={{
        backgroundColor: '#1d1e25'
      }}
    >
      <EfficiencyWrapper>
        <div style={{ width: '33%' }}>
          <PercentagePieChart label="车辆利用率" value={0} />
        </div>
        <div style={{ width: '33%' }}>
          <PercentagePieChart label="无故障率" value={50} />
        </div>
        <div style={{ width: '33%' }}>
          <PercentagePieChart label="交管占比" value={100} />
        </div>
      </EfficiencyWrapper>
    </Panel>
  )
}

export default memo(Efficiency)

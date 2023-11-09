import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'
import { Panel } from 'ui'

import PercentagePieChart from './components/percentagePieChart'
import { EfficiencyWrapper } from './style'

interface IEfficiencyProps {
  useRatio?: number // 利用率
  troubleprool?: number // 无故障率
  trafficControl?: number // 交管占比
}

// 效率统计
const Efficiency: FC<PropsWithChildren<IEfficiencyProps>> = (props) => {
  const { useRatio = 0, troubleprool = 0, trafficControl = 0 } = props
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
          <PercentagePieChart label="车辆利用率" value={useRatio} />
        </div>
        <div style={{ width: '33%' }}>
          <PercentagePieChart label="无故障率" value={troubleprool} />
        </div>
        <div style={{ width: '33%' }}>
          <PercentagePieChart label="交管占比" value={trafficControl} />
        </div>
      </EfficiencyWrapper>
    </Panel>
  )
}

export default memo(Efficiency)

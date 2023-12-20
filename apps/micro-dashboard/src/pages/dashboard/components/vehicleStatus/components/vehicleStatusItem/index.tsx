import { useVoerkaI18n } from '@voerkai18n/react'
import type { FC, PropsWithChildren } from 'react'
import React, { memo } from 'react'

import { VehicleStatusItemWrapper } from './style'

interface IVehicleStatusItemProps {
  value?: number
  text?: string
  color?: React.CSSProperties['color']
}

const VehicleStatusItem: FC<PropsWithChildren<IVehicleStatusItemProps>> = (props) => {
  const { t } = useVoerkaI18n()
  const { value = 0, text = t('在线'), color = '#00c6c7' } = props
  return (
    <VehicleStatusItemWrapper dotColor={color}>
      <div className="header">
        <div className="value">{value}</div>
        <div className="unit">{t('台')}</div>
      </div>
      <div className="footer">
        <span className="dot"></span>
        <div className="text">{text}</div>
      </div>
    </VehicleStatusItemWrapper>
  )
}

export default memo(VehicleStatusItem)

import { Bounds } from '@react-three/drei'
import type { FC } from 'react'
import React, { memo } from 'react'

import { shelvesFooterHeight } from '../../common'
import Ground from './ground/Ground'
import Locations from './locations/Locations'
import Shelves from './shelves/Shelves'
import TestMesh from './testMesh/TestMesh'
import Tracks from './tracks/Tracks'
import { IWarehouseProps } from './type'
// import Wall from './wall/Wall'

const Warehouse: FC<IWarehouseProps> = (props) => {
  const { x = 0, y = 0, z = 0, groundProps, shelvesList, locationsProps, tracksProps } = props

  return (
    <group position={[x, y, z]}>
      <Bounds>
        <TestMesh />
      </Bounds>
      {groundProps && <Ground {...groundProps} />}
      {/* 货架和货物(货架底部支撑的立柱需要占据高度，所以货架和货物需要整体向上移动) */}
      <group position={[0, shelvesFooterHeight, 0]}>
        {shelvesList && shelvesList.map((shelvesProps) => <Shelves key={shelvesProps.id} {...shelvesProps} />)}
        {locationsProps && <Locations {...locationsProps} />}
      </group>
      {tracksProps && <Tracks {...tracksProps} />}
    </group>
  )
}

export default memo(Warehouse)

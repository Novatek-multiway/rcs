import type { FC } from 'react'
import React, { memo, useMemo } from 'react'
import type { Mesh } from 'three'
import * as THREE from 'three'

import { getCenterPointOfRectEdges } from '../../../../utils/math'
import { IAreaProps } from './type'

const Area: FC<IAreaProps> = (props) => {
  const { x, y, z, width, depth, areaMarkLineWidth = 1 } = props
  const areaEdgePositions: Mesh['position'][] = useMemo(
    () => getCenterPointOfRectEdges(width, depth, { x, y: z }).map((p) => new THREE.Vector3(p[0], y + 0.001, p[1])),
    [width, depth, x, y, z]
  )

  const edgeSizes: [width: number, height: number][] = [
    [areaMarkLineWidth, depth + areaMarkLineWidth],
    [width + areaMarkLineWidth, areaMarkLineWidth]
  ]

  return areaEdgePositions.map((p, index) => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} key={index} position={p} receiveShadow>
      <planeGeometry args={edgeSizes[Math.floor(index / 2)]} />
      <meshStandardMaterial color={'#d1ae00'} transparent opacity={1} />
    </mesh>
  ))
}

export default memo(Area)

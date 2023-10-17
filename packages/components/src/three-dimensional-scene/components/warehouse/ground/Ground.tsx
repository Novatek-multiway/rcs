import { RoundedBox } from '@react-three/drei'
import type { FC } from 'react'
import React, { memo } from 'react'

import Area from './area/Area'
import Tunnel from './tunnel/Tunnel'
// import * as THREE from 'three'
import type { IGroundProps } from './type'
// import { useControls } from 'leva'
// import { useAutomaticTextures } from '../../../hooks/useAutomaticTextures'
// import { useControls } from 'leva'

const groundHeight = 1

const Ground: FC<IGroundProps> = (props) => {
  const {
    width,
    depth,
    // groundTexturePathMap = {}
    x = 0,
    y = 0,
    z = 0,
    areas,
    tunnels
  } = props

  return (
    <group>
      <RoundedBox
        args={[width, groundHeight, depth]}
        radius={0.5} // Radius of the rounded corners. Default is 0.05
        smoothness={4}
        position={[x, y - groundHeight / 2, z]}
        receiveShadow
      >
        {/* <MeshReflectorMaterial
          blur={blur}
          resolution={resolution}
          mixBlur={mixBlur}
          mixStrength={mixStrength}
          depthScale={depthScale}
          minDepthThreshold={minDepthThreshold}
          maxDepthThreshold={maxDepthThreshold}
          color="#bcc2cb"
          metalness={metalness}
          roughness={roughness}
          mirror={0}
        /> */}
        <meshStandardMaterial roughness={0.3} metalness={0.2} />
      </RoundedBox>
      {areas?.map((area) => (
        <Area key={area.id} {...area} />
      ))}
      {tunnels?.map((tunnel) => (
        <Tunnel key={tunnel.id} {...tunnel} />
      ))}
    </group>
  )
}

export default memo(Ground)

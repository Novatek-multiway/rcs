import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { FC } from 'react'
import React, { memo, useRef } from 'react'
import * as THREE from 'three'

import { ITunnelProps } from './type'

const Tunnel: FC<ITunnelProps> = (props) => {
  const { x, y, z, width, depth, name } = props
  const lineRef = useRef<any>(null)

  useFrame(() => {
    lineRef.current?.lookAt(new THREE.Vector3(0, 1, 0))
  })
  return (
    <group position={[x, y + 0.002, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={'#00492d'} />
        {/* <Decal position={[0, 0, 0]}>
          <meshStandardMaterial>
            <RenderTexture attach={'map'}>
              <color attach="background" args={['#af2040']} />
              <Text fontSize={10} color="white">
                123
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </Decal> */}
        <Text fontSize={1} color="white" position={[0, 0, 0.002]}>
          {name}
        </Text>
      </mesh>
    </group>
  )
}

export default memo(Tunnel)

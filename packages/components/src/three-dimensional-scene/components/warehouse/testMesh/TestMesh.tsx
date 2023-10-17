import { useBounds, useCubeTexture, useFBX } from '@react-three/drei'
import { useControls } from 'leva'
import type { FC } from 'react'
import React, { memo, useState } from 'react'
import * as THREE from 'three'

import { defaultCameraPosition } from '../../../common'

const TestMesh: FC = () => {
  const envMap = useCubeTexture(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], {
    path: '/textures/env/'
  })
  envMap.mapping = THREE.CubeReflectionMapping
  const { metalness, roughness } = useControls('testMesh', {
    metalness: {
      value: 1,
      step: 0.01
    },
    roughness: {
      value: 0.5,
      step: 0.01
    }
  })

  const mxwModel = useFBX('/model/car/Mxw-1.FBX')
  mxwModel.castShadow = true
  mxwModel.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })

  const bounds = useBounds()
  const [isActive, setIsActive] = useState(false)

  return (
    <group>
      <mesh
        position={[0, 5, 0]}
        castShadow
        onClick={() => {
          bounds.refresh().clip().fit()
          setIsActive(true)
        }}
        onPointerMissed={() => {
          if (isActive) {
            bounds.to({ position: defaultCameraPosition, target: [0, 0, 0] })
            setIsActive(false)
          }
        }}
      >
        <cylinderGeometry args={[1, 1, 10, 64]}></cylinderGeometry>
        {/* <sphereGeometry args={[1]}></sphereGeometry> */}
        <meshPhysicalMaterial metalness={metalness} roughness={roughness} envMap={envMap}></meshPhysicalMaterial>
      </mesh>
      {/* <group scale={[0.001, 0.001, 0.001]}>
        <primitive object={mxwModel} />
      </group> */}
    </group>
  )
}

export default memo(TestMesh)

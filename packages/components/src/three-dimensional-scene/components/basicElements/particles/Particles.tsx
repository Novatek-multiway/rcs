import React, { FC, memo,useMemo } from 'react'
import * as THREE from 'three'

import { useAutomaticTextures } from '../../../hooks/useAutomaticTextures'
import { IParticlesProps } from './type'

const Particles: FC<IParticlesProps> = ({ count = 100, width = 100, height = 100, depth = 100 }) => {
  const { textureMap } = useAutomaticTextures({
    map: '/textures/particle/trace_01.png',
    alphaMap: '/textures/particle/trace_01.png'
  })
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // const t = Math.random() * 100
      // const factor = 20 + Math.random() * 100
      // const speed = 0.01 + Math.random() / 200
      // const xFactor = -50 + Math.random() * 100
      // const yFactor = -50 + Math.random() * 100
      // const zFactor = -50 + Math.random() * 100
      temp[i * 3] = (Math.random() - 0.5) * width!
      temp[i * 3 + 1] = (Math.random() - 0.5) * height!
      temp[i * 3 + 2] = (Math.random() - 0.5) * depth!
      // temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])
  console.log(particles)

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
        </bufferGeometry>
        {/* <sphereGeometry args={[10, 32, 32]}></sphereGeometry> */}
        <pointsMaterial
          size={100}
          sizeAttenuation
          {...textureMap}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

export default memo(Particles)

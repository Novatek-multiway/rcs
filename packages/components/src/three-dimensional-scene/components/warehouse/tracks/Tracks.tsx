import { useCubeTexture } from '@react-three/drei'
import type { FC } from 'react'
import React, { memo, useLayoutEffect, useMemo, useRef } from 'react'
import type { InstancedMesh } from 'three'
import * as THREE from 'three'

import HollowCylinderGeometry from '../../../geometry/HollowCylinderGeometry'
import { getCenterPointOfRectEdges } from '../../../utils/math'
import { ITracksProps } from './type'

const beamSize = 0.1 // 横梁厚度和高度
const beamInnerRadius = beamSize / 4 / Math.sin(Math.PI / 4)
const beamOuterRadius = beamSize / 2 / Math.sin(Math.PI / 4)
const plateThickness = 0.02 // 挡板厚度
const plateHeight = 0.15 // 挡板高度

const tempBeamObject = new THREE.Object3D()
const tempPlateObject = new THREE.Object3D()

// 立库货架中四向车行驶的滑轨
const Tracks: FC<ITracksProps> = (props) => {
  const { tracksList } = props
  const envMap = useCubeTexture(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], {
    path: '/textures/env/'
  })

  const trackSideLayoutDataList = useMemo(
    () =>
      tracksList.flatMap(({ x, y, z, width, depth }) => {
        const centerPointsOfRectEdges = getCenterPointOfRectEdges(width, depth, { x, y: z })

        const direction = width > depth ? 'x' : 'y' // 当前轨道是x方向还是y方向排布
        const length = width > depth ? width : depth // 当前滑轨的长度

        if (direction === 'x') {
          const xCenterPointsOfRectEdges = centerPointsOfRectEdges.slice(2)
          return xCenterPointsOfRectEdges.map((point, index) => {
            const offset = index === 0 ? -(beamSize / 2 - plateThickness / 2) : beamSize / 2 - plateThickness / 2
            return {
              beamX: point[0], // 横梁的坐标x
              beamY: y,
              beamZ: point[1],
              beamRotationY: Math.PI / 2,
              beamDepth: length,

              plateX: point[0],
              plateY: y + beamSize + plateHeight / 2,
              plateZ: point[1] + offset,
              plateWidth: length,
              plateHeight,
              plateDepth: plateThickness
            }
          })
        } else {
          const yCenterPointsOfRectEdges = centerPointsOfRectEdges.slice(0, 2)
          return yCenterPointsOfRectEdges.map((point, index) => {
            const offset = index === 0 ? -(beamSize / 2 - plateThickness / 2) : beamSize / 2 - plateThickness / 2

            return {
              beamX: point[0],
              beamY: y,
              beamZ: point[1],
              beamRotationY: 0,
              beamDepth: length,

              plateX: point[0] + offset,
              plateY: y + beamSize + plateHeight / 2,
              plateZ: point[1],
              plateWidth: plateThickness,
              plateHeight,
              plateDepth: length
            }
          })
        }
      }),
    []
  )

  const beamsMeshRef = useRef<InstancedMesh>(null)
  const platesMeshRef = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    const beamsMesh = beamsMeshRef.current
    const platesMesh = platesMeshRef.current

    for (let i = 0; i < trackSideLayoutDataList.length; i++) {
      const {
        beamX,
        beamY,
        beamZ,
        beamRotationY,
        beamDepth,
        plateX,
        plateY,
        plateZ,
        plateWidth,
        plateHeight,
        plateDepth
      } = trackSideLayoutDataList[i]

      // 设置beam
      tempBeamObject.position.set(beamX, beamY + beamSize / 2, beamZ)
      tempBeamObject.scale.set(1, 1, beamDepth)
      tempBeamObject.rotation.set(0, beamRotationY, Math.PI / 4)
      tempBeamObject.updateMatrix()
      beamsMesh?.setMatrixAt(i, tempBeamObject.matrix)
      tempBeamObject.rotation.set(0, -beamRotationY, -Math.PI / 4) // 撤销旋转, 防止下一个实例旋转错误

      // 设置plate
      tempPlateObject.position.set(plateX, plateY, plateZ)
      tempPlateObject.scale.set(plateWidth, plateHeight, plateDepth)
      tempPlateObject.updateMatrix()
      platesMesh?.setMatrixAt(i, tempPlateObject.matrix)
    }
  }, [])

  return (
    <group>
      <instancedMesh
        castShadow
        receiveShadow
        ref={beamsMeshRef}
        args={[undefined, undefined, trackSideLayoutDataList.length]}
      >
        <HollowCylinderGeometry innerRadius={beamInnerRadius} outerRadius={beamOuterRadius} height={1} />
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        <meshPhysicalMaterial metalness={0.8} roughness={0.6} envMap={envMap} />
      </instancedMesh>
      <instancedMesh
        castShadow
        receiveShadow
        ref={platesMeshRef}
        args={[undefined, undefined, trackSideLayoutDataList.length]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial metalness={0.8} roughness={0.6} envMap={envMap} />
      </instancedMesh>
      {/* <mesh
        castShadow
        receiveShadow
        position={[x, y + beamSize / 2, z]}
        rotation={[0, direction === 'y' ? 0 : Math.PI / 2, Math.PI / 4]}
      >
        <HollowCylinderGeometry innerRadius={beamInnerRadius} outerRadius={beamOuterRadius} height={length} />
        <meshPhysicalMaterial metalness={0.8} roughness={0.6} envMap={envMap} />
      </mesh> */}
      {/* <mesh
        castShadow
        receiveShadow
        position={[x, y + beamSize + plateHeight / 2, z + beamSize / 2 - plateThickness / 2]}
      >
        <boxGeometry
          args={[direction === 'y' ? plateThickness : length, plateHeight, direction === 'y' ? length : plateThickness]}
        />
        <meshPhysicalMaterial metalness={0.8} roughness={0.6} envMap={envMap} />
      </mesh> */}
    </group>
  )
}

export default memo(Tracks)

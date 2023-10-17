import { useCubeTexture } from '@react-three/drei'
import type { FC } from 'react'
import React, { memo, useLayoutEffect, useMemo, useRef } from 'react'
import type { InstancedMesh } from 'three'
import * as THREE from 'three'

import { beamThickness, shelvesFooterHeight } from '../../../common'
import { getCenterPointOfRectEdges, getCornerPointOfRectEdges } from '../../../utils/math'
import { IShelvesProps } from './type'
import { getShelfPositionAndSizeList } from './util'

const tempObject = new THREE.Object3D()

const Shelves: FC<IShelvesProps> = (props) => {
  const { width, height, depth, column, row, layer, x, y, z } = props

  const envMap = useCubeTexture(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], {
    path: '/textures/env/'
  })

  const shelfBeamsPositionAndSizeList = useMemo(() => {
    const shelfPositionAndSizeList = getShelfPositionAndSizeList({
      width,
      height,
      depth,
      column,
      row,
      layer,
      x,
      y,
      z
    })

    return shelfPositionAndSizeList.flatMap((shelfPositionAndSize) => {
      const { width, height, depth, x, y, z, isFirstLayer } = shelfPositionAndSize
      // y方向横梁
      let yBeamPositionAndSize = getCornerPointOfRectEdges(width, depth, { x, y: z }).map((p) => ({
        x: p[0],
        y: y,
        z: p[1],
        width: beamThickness,
        height,
        depth: beamThickness
      }))

      // 如果是第一层，需要加上货架支撑的立柱
      if (isFirstLayer) {
        yBeamPositionAndSize = yBeamPositionAndSize.concat(
          yBeamPositionAndSize.map((p) => ({
            ...p,
            y: -shelvesFooterHeight / 2,
            height: shelvesFooterHeight
          }))
        )
      }

      // x和z方向横梁
      const xzBeamPositionAndSize = getCenterPointOfRectEdges(width, depth, { x, y: z }).map((p, index) => {
        if (index >= 2) {
          return {
            x: p[0],
            y: y - height / 2,
            z: p[1],
            width,
            height: beamThickness,
            depth: beamThickness
          }
        } else {
          return {
            x: p[0],
            y: y - height / 2,
            z: p[1],
            width: beamThickness,
            height: beamThickness,
            depth
          }
        }
      })

      return yBeamPositionAndSize.concat(xzBeamPositionAndSize)
    })
  }, [])

  const shelvesMeshRef = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    const shelvesMesh = shelvesMeshRef.current
    for (let i = 0; i < shelfBeamsPositionAndSizeList.length; i++) {
      const { x, y, z, width, height, depth } = shelfBeamsPositionAndSizeList[i]
      tempObject.position.set(x, y, z)
      tempObject.scale.set(width, height, depth)
      tempObject.updateMatrix()
      shelvesMesh?.setMatrixAt(i, tempObject.matrix)
    }
  }, [])
  return (
    <instancedMesh
      castShadow
      receiveShadow
      ref={shelvesMeshRef}
      args={[undefined, undefined, shelfBeamsPositionAndSizeList.length]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial metalness={0.8} roughness={0.6} envMap={envMap} />
    </instancedMesh>
  )
}

export default memo(Shelves)

import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { FC } from 'react'
import React, { memo, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { InstancedMesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'

import { ThreeDimensionalSceneContext } from '../../../context/threeDimensionalSceneContext'
import { useAutomaticTextures } from '../../../hooks/useAutomaticTextures'
import { useSubscription } from '../../../utils/event-bus'
import { ILocationsProps } from './type'

const tempObject = new THREE.Object3D()

type TLocationsItem = ILocationsProps['locations'][0]

const LocationsItem: FC<{
  locationsItem: TLocationsItem
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLocationClick?: (locationsItem: TLocationsItem) => void
}> = ({ locationsItem, onLocationClick }) => {
  const instanceRef = useRef<any>(null)
  const { x, y, z, width, height, depth } = locationsItem
  useFrame(() => {
    const instance = instanceRef.current
    instance.position.set(x, y, z)
    instance.scale.set(width, height, depth)
  })

  const handleClick = (e: any) => {
    if (locationsItem.asGoods) {
      e.stopPropagation()
      return
    } // 作为货物显示，不需要处理点击事件

    // 显示库位信息
    onLocationClick?.(locationsItem)
  }

  return <Instance ref={instanceRef} onClick={handleClick}></Instance>
}

const Locations: FC<ILocationsProps> = (props) => {
  const {
    locations,
    locationsTexturePathMap = {
      map: '/textures/goods/goods_color.png'
    }
  } = props
  const locationsMeshRef = useRef<InstancedMesh>(null)
  const { textureMap } = useAutomaticTextures(locationsTexturePathMap)

  useLayoutEffect(() => {
    const locationsMesh = locationsMeshRef.current
    for (let i = 0; i < locations.length; i++) {
      const { x, y, z, width, height, depth } = locations[i]
      tempObject.position.set(x, y, z)
      tempObject.scale.set(width, height, depth)
      tempObject.updateMatrix()
      locationsMesh?.setMatrixAt(i, tempObject.matrix)
    }
  }, [locations])

  const onBeforeCompile: MeshStandardMaterial['onBeforeCompile'] = (shader) => {
    // 修改顶点着色器
    const baseVertex = `
    attribute float isLocationsExist;
    varying float vIsLocationsExist;

    ${shader.vertexShader}
    `
    shader.vertexShader = baseVertex.replace(
      '#include <fog_vertex>',
      `
     #include <fog_vertex>
     vIsLocationsExist = isLocationsExist;
    `
    )

    // 修改片段着色器
    const baseFragment = `
  uniform vec3 uColor;
  varying float vIsLocationsExist;
  ${shader.fragmentShader}
`
    shader.fragmentShader = baseFragment.replace(
      '#include <dithering_fragment>',
      `
  #include <dithering_fragment>
  gl_FragColor.a = vIsLocationsExist;
  if(vIsLocationsExist != 1.0) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.2);
  }
  `
    )
  }

  const isLocationsExistData = useMemo(() => {
    const data = new Float32Array(locations.length)
    for (let i = 0; i < locations.length; i++) {
      data[i] = locations[i].asGoods || locations[i].isFull ? 1.0 : 0.0
    }
    return data
  }, [locations])

  const [selectedLocationsItem, setSelectedLocationsItem] = useState<TLocationsItem>()
  const { eventEmitter } = useContext(ThreeDimensionalSceneContext)
  useSubscription(eventEmitter, 'CLOSE_LOCATION_DETAIL_PANEL', () => {
    // 清空选中的货位
    setSelectedLocationsItem(undefined)
  })

  return (
    <group>
      {/* <instancedMesh receiveShadow castShadow ref={locationsMeshRef} args={[undefined, undefined, locations.length]}>
        <boxGeometry></boxGeometry>
        <meshStandardMaterial roughness={1} metalness={0.3} {...textureMap} onBeforeCompile={onBeforeCompile} />
      </instancedMesh> */}
      <Instances>
        <boxGeometry>
          <instancedBufferAttribute attach="attributes-isLocationsExist" args={[isLocationsExistData, 1]} />
        </boxGeometry>
        <meshStandardMaterial
          roughness={1}
          metalness={0.3}
          transparent
          {...textureMap}
          onBeforeCompile={onBeforeCompile}
        />
        {locations.map((locationsItem) => (
          <group key={locationsItem.id}>
            <LocationsItem
              locationsItem={locationsItem}
              onLocationClick={(locationsItem) => {
                setSelectedLocationsItem(locationsItem)
                // 显示库位详情面板
                eventEmitter.emit('OPEN_LOCATION_DETAIL_PANEL', locationsItem)
              }}
            />
          </group>
        ))}
      </Instances>
      {selectedLocationsItem && (
        <mesh position={[selectedLocationsItem.x, selectedLocationsItem.y, selectedLocationsItem.z]}>
          <boxGeometry
            args={[
              selectedLocationsItem.width * 1.05,
              selectedLocationsItem.height * 1.05,
              selectedLocationsItem.depth * 1.05
            ]}
          />
          <meshBasicMaterial depthWrite={false} color="#0EEC82" />
        </mesh>
      )}
    </group>
  )
}

export default memo(Locations)

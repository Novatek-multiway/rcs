import { animated, useSpring } from '@react-spring/three'
import { useLoader } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'
import { useContext, useEffect, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { ThreeDimensionalSceneContext } from '../../context/threeDimensionalSceneContext'
import { useSubscription } from '../../utils/event-bus'
import { getScalingOfModelGroupTargetSize } from '../../utils/fbx'
import { Locations } from '../warehouse/locations'

export interface IForkTruckCar {
  id: number
  hasLocations?: boolean
  position?: THREE.Vector3
  rotationY?: number
  liftArmHeight?: number
  forkArmHeight?: number
  width?: number
  height?: number
  depth?: number
  onClick?: (id: number) => void
}

function ForkTruck(props: IForkTruckCar) {
  const {
    id,
    hasLocations = true,
    position = [35, 0, -5],
    liftArmHeight = 0,
    forkArmHeight = 0,
    rotationY = 0,
    width = 1.12,
    height = 2.2,
    depth = 2.35,
    onClick
  } = props

  const models = useLoader(FBXLoader, ['/model/car/SE-1.FBX', '/model/car/SE-2.FBX', '/model/car/SE-3.FBX'])
  const [scaling, setScaling] = useState<THREE.Vector3>(new THREE.Vector3(1, 1, 1))

  useEffect(() => {
    const scaling = getScalingOfModelGroupTargetSize(models, { width, height, depth })
    setScaling(scaling)

    models.forEach((model) => {
      model.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    })
  }, [models])

  const [selected, setSelected] = useState(false)
  const [hovered, setHovered] = useState(false)

  const { eventEmitter } = useContext(ThreeDimensionalSceneContext)
  useSubscription(eventEmitter, 'CLOSE_DEVICE_DETAIL_PANEL', () => {
    // 清空选中的设备
    setSelected(false)
  })
  useSubscription<number>(eventEmitter, 'OPEN_DEVICE_DETAIL_PANEL', (deviceId) => {
    // 有其他设备点击，取消当前设备的选中状态
    if (deviceId !== id) setSelected(false)
  })

  const [externalGroupProps] = useSpring(
    () => ({
      position,
      rotationY
    }),
    [position, rotationY]
  )

  return (
    <animated.group
      position={externalGroupProps.position as unknown as THREE.Vector3}
      rotation-y={externalGroupProps.rotationY}
    >
      <Select
        enabled={hovered || selected}
        onClick={() => {
          setSelected(true)
          onClick?.(id)
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* 堆高车模型 */}
        <group>
          {/* 叉臂 */}
          <group position-y={liftArmHeight}>
            <group>
              <primitive object={models[0]} position={[0, forkArmHeight, -0.5]} scale={scaling} />
            </group>
            {/* 举升臂 */}
            <primitive object={models[1]} position={[0, 0, -0.5]} scale={scaling} />
          </group>
          {/* 车体 */}
          <primitive object={models[2]} position={[0, 0, 0]} scale={scaling} />
        </group>
      </Select>

      {hasLocations && (
        <Locations
          locations={[
            {
              id: '1',
              x: 0,
              y: liftArmHeight + forkArmHeight + 0.7,
              z: -1.5,
              width: 1,
              height: 1,
              depth: 1,
              asGoods: true
            }
          ]}
        />
      )}
    </animated.group>
  )
}

export default ForkTruck

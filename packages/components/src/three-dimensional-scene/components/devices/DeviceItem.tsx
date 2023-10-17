import { useLoader } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'
import type { FC } from 'react'
import React, { memo, useContext, useEffect, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { ThreeDimensionalSceneContext } from '../../context/threeDimensionalSceneContext'
import { useSubscription } from '../../utils/event-bus'
import { getScalingOfModelGroupTargetSize } from '../../utils/fbx'

interface IDeviceItemProps {
  id: number
  modelPaths: string[]
  size: { width: number; height: number; depth: number }
  onClick?: (id: number) => void
}

const DeviceItem: FC<IDeviceItemProps> = (props) => {
  const { id, modelPaths, size, onClick } = props
  const models = useLoader(FBXLoader, modelPaths)

  const [groupScale, setGroupScale] = useState<THREE.Vector3>()

  // 计算导入的模型组的BoundingBoxSize
  useEffect(() => {
    const scale = getScalingOfModelGroupTargetSize(models, size)
    setGroupScale(scale)

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
  return (
    <Select enabled={hovered || selected}>
      <group
        scale={groupScale}
        onClick={() => {
          setSelected(true)
          onClick?.(id)
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {models.map((model) => (
          <primitive key={model.uuid} object={model.clone()} />
        ))}
      </group>
    </Select>
  )
}

export default memo(DeviceItem)

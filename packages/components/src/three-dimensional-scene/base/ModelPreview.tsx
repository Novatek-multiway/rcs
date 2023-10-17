import { useLoader } from '@react-three/fiber'
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Group } from 'three'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { getBoundingBoxSize } from '../utils/fbx'
import { Setup } from './Setup'

export interface IModelPreviewProps {
  modelPaths: string[]
  initialSize?: { width: number; height: number; depth: number }
}

export interface IModelPreviewRef {
  size: IModelPreviewProps['initialSize']
  updateSize: (size: IModelPreviewProps['initialSize']) => void
}

export const ModelPreview = memo(
  forwardRef<IModelPreviewRef, IModelPreviewProps>((props, ref) => {
    const { modelPaths, initialSize } = props
    const models = useLoader(FBXLoader, modelPaths)
    const modelGroupRef = useRef<Group>(null)

    const [size, setSize] = useState<IModelPreviewProps['initialSize']>(initialSize)

    const [initialModelGroupBoundingBoxSize, setInitialModelGroupBoundingBoxSize] = useState<THREE.Vector3>()

    // 计算导入的模型组的BoundingBoxSize
    const updateInitialModelGroupBoundingBoxSize = useCallback(() => {
      let group: Group | null = new THREE.Group()
      models.forEach((model) => group!.add(model))
      const modelGroupBoundingBoxSize = getBoundingBoxSize(group)

      setInitialModelGroupBoundingBoxSize(modelGroupBoundingBoxSize)
      group = null
    }, [models])

    useEffect(() => {
      updateInitialModelGroupBoundingBoxSize()
    }, [updateInitialModelGroupBoundingBoxSize])

    useImperativeHandle(ref, () => ({
      size,
      updateSize: (size) => {
        setSize(size)
      }
    }))

    useEffect(() => {
      if (models) {
        models.forEach((model) => {
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })
        })
      }
    }, [models])

    const resizeModelGroup = useCallback(() => {
      if (modelGroupRef.current && initialModelGroupBoundingBoxSize) {
        const modelGroup = modelGroupRef.current
        const { x, y, z } = initialModelGroupBoundingBoxSize
        if (x === 0 && y === 0 && z === 0) return
        if (size) {
          // 有传入尺寸，显示传入的尺寸
          const { width, height, depth } = size
          const xScale = width / x
          const yScale = height / y
          const zScale = depth / z

          modelGroup.scale.set(xScale, yScale, zScale)
        } else {
          // 没有传入尺寸，显示成长或宽或高达到1的尺寸
          const maxValue = Math.max(x, y, z)
          const scale = 1 / maxValue
          setSize({
            width: x * scale,
            height: y * scale,
            depth: z * scale
          })
        }
      }
    }, [size, initialModelGroupBoundingBoxSize])
    useEffect(() => {
      resizeModelGroup()
    }, [resizeModelGroup])

    return (
      <Setup
        style={{ height: '100%' }}
        onCreated={() => {
          // hack方案， 确保拿到正确的modelGroupRef
          resizeModelGroup()
        }}
      >
        <group ref={modelGroupRef}>
          {models.map((model) => (
            <primitive key={model.uuid} object={model} />
          ))}
        </group>
      </Setup>
    )
  })
)
